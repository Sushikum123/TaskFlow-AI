# TaskFlow AI

### Smart planning for students and professionals

TaskFlow AI is a simple intelligent task-planning application that helps users organize their daily workload.

## Problem

People often have multiple tasks with different deadlines and priorities. A normal to-do list only stores tasks. It does not help the user decide what should be done first.

## Solution

TaskFlow AI analyzes:

- Task priority
- Deadline
- Estimated completion time
- Completion status

The system then creates an optimized task order.

## Main Features

- Add tasks
- Set deadlines
- Set priority
- Set estimated time
- Automatically prioritize tasks
- Create a smart daily plan
- Mark tasks as completed
- Delete tasks
- Automatically save tasks using LocalStorage
- Responsive design

## How the Agent Works

The agent calculates a priority score.

Example:

High Priority = +50 points

Deadline within 1 day = +40 points

Deadline within 3 days = +25 points

Short task = +5 points

Tasks with higher scores are placed earlier in the plan.

## Technology

HTML

CSS

JavaScript

LocalStorage

## Future Improvements

The project can later be connected to an AI model.

Future versions could include:

- Natural language task input
- AI-generated schedules
- Automatic task breakdown
- Calendar integration
- Voice input
- Email reminders
- AI productivity recommendations

## How to Run

1. Download or clone the project.
2. Open the folder in VS Code.
3. Open `index.html`.
4. Use Live Server.
5. Add your tasks.
6. Click "Create Smart Plan".

## Project Goal

The goal is to demonstrate how an autonomous agent can observe user information, make decisions and generate an action plan.