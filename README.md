# Marketing AI Agent — Frontend

Chat interface for the [Marketing AI Agent](https://github.com/ferdianmaulana/marketing-ai-agent) backend. Built with Next.js, it lets users ask natural language questions about YouTube channel performance and displays which agent tools were called per response.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14, TypeScript |
| Styling | Tailwind CSS |
| Markdown rendering | react-markdown |
| Infrastructure | Docker, Docker Compose |
| CI/CD | GitHub Actions |

---

## Project Structure

```
marketing-ai-agent-ui/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD — deploy on push to main
├── app/
│   ├── layout.tsx
│   └── page.tsx            # main chat page
├── components/
│   ├── chat_window.tsx     # message list with markdown rendering
│   ├── chat_input.tsx      # input box with send button
│   └── tool_badge.tsx      # badges showing which tools were called
├── Dockerfile
├── docker-compose.yml
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- Running instance of the [backend](https://github.com/ferdianmaulana/marketing-ai-agent)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/ferdianmaulana/marketing-ai-frontend.git
cd marketing-ai-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables

# 4. Run the development server
npm run dev
```

Open `http://localhost:3000`.

### Run with Docker

```bash
docker compose up -d --build
```

---

## Features

- **Chat interface** — conversational UI to interact with the AI agent
- **Tool badges** — shows which backend tools the agent called per response
- **Markdown rendering** — agent responses render with proper formatting
- **Chat history** — full conversation context sent with each request
- **Responsive input** — auto-expanding textarea, send on Enter

---

## Tool Badges

Each agent response shows which tools were called, color-coded by type:

| Badge | Tool |
|---|---|
| 🔵 Channel stats | `get_channel_stats` |
| 🟣 Top videos | `get_top_videos` |
| 🩵 Compare channels | `compare_channels` |
| 🟡 List channels | `list_tracked_channels` |
