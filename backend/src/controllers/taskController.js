import asyncHandler from 'express-async-handler'
import Task from '../models/Task.js'
import User from '../models/User.js'
import { OpenAI } from 'openai'
import { sendEmail } from '../services/emailService.js'
import { io } from '../server.js'

const openai = new OpenAI(process.env.OPENAI_API_KEY)

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, assignee, dueDate } = req.query
  const query = { organization: req.user.organization }

  if (status) query.status = status
  if (priority) query.priority = priority
  if (assignee) query.assignee = assignee
  if (dueDate) query.dueDate = { $lte: new Date(dueDate) }

  // RBAC: Managers can only see their team's tasks
  if (req.user.role === 'manager') {
    query.$or = [
      { assignee: req.user._id },
      { createdBy: req.user._id }
    ]
  }

  const tasks = await Task.find(query)
    .populate('assignee', 'name email avatar')
    .populate('createdBy', 'name email')
    .sort('-createdAt')

  res.json(tasks)
})

// @desc    Create new task with AI suggestions
// @route   POST /api/tasks
// @access  Private (Admin/Manager)
export const createTask = asyncHandler(async (req, res) => {
  const { assignee } = req.body
  
  // Verify assignee belongs to same organization
  const assigneeUser = await User.findOne({
    _id: assignee,
    organization: req.user.organization
  })
  
  if (!assigneeUser) {
    res.status(400)
    throw new Error('Invalid assignee')
  }

  const task = await Task.create({
    ...req.body,
    organization: req.user.organization,
    createdBy: req.user._id
  })

  // Get AI suggestions for similar tasks
  const aiSuggestions = await getAITaskSuggestions(task)

  // Send real-time notification
  io.to(assigneeUser._id.toString()).emit('new-task', task)

  // Send email notification
  await sendTaskAssignmentEmail(assigneeUser, task)

  res.status(201).json({
    ...task.toObject(),
    aiSuggestions
  })
})

// AI-powered task suggestions
const getAITaskSuggestions = async (task) => {
  try {
    const similarTasks = await Task.find({
      title: { $regex: task.title, $options: 'i' },
      organization: task.organization
    }).limit(5)

    const prompt = `
      Based on this new task: "${task.title} - ${task.description}",
      and these similar historical tasks: ${JSON.stringify(similarTasks)},
      provide 3 suggestions for:
      1. Potential pitfalls to avoid
      2. Recommended resources
      3. Estimated optimal timeline
      
      Format as a JSON object with these keys: pitfalls, resources, timeline
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    return JSON.parse(response.choices[0].message.content)
  } catch (error) {
    console.error('AI suggestion error:', error)
    return null
  }
}

const sendTaskAssignmentEmail = async (user, task) => {
  const subject = `New Task Assigned: ${task.title}`
  const html = `
    <h2>You've been assigned a new task</h2>
    <p><strong>Title:</strong> ${task.title}</p>
    <p><strong>Priority:</strong> ${task.priority}</p>
    <p><strong>Due Date:</strong> ${task.dueDate.toDateString()}</p>
    <p>Please log in to SmartTasker to view and accept this task.</p>
    <a href="${process.env.FRONTEND_URL}/tasks/${task._id}">View Task</a>
  `

  await sendEmail({
    to: user.email,
    subject,
    html
  })
}