import OpenAI from 'openai';
import User from '../models/User.js';
import Task from '../models/Task.js';

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async suggestBestAssignee(taskData, organizationId) {
    try {
      const users = await User.find({ organization: organizationId, role: { $ne: 'Admin' } });
      const tasks = await Task.find({ organization: organizationId }).populate('assignee');

      const workloadAnalysis = users.map(user => {
        const userTasks = tasks.filter(task => 
          task.assignee && task.assignee._id.toString() === user._id.toString()
        );
        const activeTasks = userTasks.filter(task => 
          task.status === 'In Progress' || task.status === 'Awaiting Acceptance'
        );

        return {
          user: user.firstName + ' ' + user.lastName,
          userId: user._id,
          currentLoad: activeTasks.length,
          completionRate: this.calculateCompletionRate(userTasks),
          avgCompletionTime: this.calculateAvgCompletionTime(userTasks)
        };
      });

      const prompt = `
        Based on the following team analysis and new task details, suggest the best assignee:
        
        Task: ${taskData.title}
        Priority: ${taskData.priority}
        Description: ${taskData.description}
        
        Team Analysis:
        ${JSON.stringify(workloadAnalysis, null, 2)}
        
        Please suggest the best assignee considering workload balance, completion rates, and task complexity.
        Respond with just the userId.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100
      });

      const suggestedUserId = response.choices[0].message.content.trim();
      return suggestedUserId;
    } catch (error) {
      console.error('AI suggestion error:', error);
      return null;
    }
  }

  async analyzeTask(taskData, organizationId) {
    try {
      const tasks = await Task.find({ organization: organizationId });
      const similarTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(taskData.title.toLowerCase()) ||
        task.description.toLowerCase().includes(taskData.description.toLowerCase())
      );

      const prompt = `
        Analyze this new task and provide insights:
        
        Task: ${taskData.title}
        Description: ${taskData.description}
        Priority: ${taskData.priority}
        
        Similar past tasks: ${similarTasks.length}
        
        Provide analysis on:
        1. Estimated completion time
        2. Potential challenges
        3. Resource requirements
        4. Success factors
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI analysis error:', error);
      return "Unable to analyze task at this time.";
    }
  }

  async generateInsights(organizationId) {
    try {
      const tasks = await Task.find({ organization: organizationId }).populate('assignee');
      const users = await User.find({ organization: organizationId });

      const analyticsData = {
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'Completed').length,
        overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
        avgCompletionTime: this.calculateOverallAvgCompletion(tasks)
      };

      const prompt = `
        Analyze this task management data and provide 3-5 actionable insights:
        ${JSON.stringify(analyticsData, null, 2)}
        
        Focus on productivity patterns, bottlenecks, and recommendations for improvement.
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI insights error:', error);
      return "Unable to generate insights at this time.";
    }
  }

  calculateCompletionRate(tasks) {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return (completed / tasks.length) * 100;
  }

  calculateAvgCompletionTime(tasks) {
    const completedTasks = tasks.filter(t => t.status === 'Completed' && t.completedAt);
    if (completedTasks.length === 0) return 0;
    
    const totalTime = completedTasks.reduce((sum, task) => {
      const created = new Date(task.createdAt);
      const completed = new Date(task.completedAt);
      return sum + (completed - created);
    }, 0);
    
    return totalTime / completedTasks.length / (1000 * 60 * 60 * 24); // days
  }

  calculateOverallAvgCompletion(tasks) {
    const completedTasks = tasks.filter(t => t.status === 'Completed' && t.completedAt);
    return this.calculateAvgCompletionTime(completedTasks);
  }
}

const aiService = new AIService();

// Named exports
export const suggestBestAssignee = aiService.suggestBestAssignee.bind(aiService);
export const analyzeTask = aiService.analyzeTask.bind(aiService);
export const generateInsights = aiService.generateInsights.bind(aiService);

// Default export
export default aiService;