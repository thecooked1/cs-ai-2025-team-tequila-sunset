
**Project Name:** ATLAS: A Conversational AI Assistant for Dungeon Masters  

**Version:** 2.0 (Updated Week 4)  
**Date:** 31/10/2025

----------

### 📐 Architecture Diagram

Here is an updated version of our diagram that includes the required elements like technology labels and latency targets.

```
┌───────────────────────────┐         ┌───────────────────────────┐
│                           │         │                           │
│   User/DM's Browser       ├───────▶│        Frontend            │
│   (Client)                │         │(React 18 + Vite on Vercel)│
│                           │◀───────┤                            │
└───────────────────────────┘         └────────────┬──────────────┘
                                                   │
                                     1. POST /api/chat
                                   (includes conversation history)
                                                   │
                         ┌─────────────────────────▼─────────────────────────┐
                         │                                                   │
                         │  Backend Server                                   │
                         │  (Python 3.11 + FastAPI on Render)                │
                         │                                                   │
                         └─────────────────────────┬─────────────────────────┘
                                                   │
                            2. Orchestrate AI Calls, Manage Session State
                                                   │
                         ┌─────────────────────────▼─────────────────────────┐
                         │                                                   │
                         │  Third-Party Services (External Dependencies)     │
                         │                                                   │
                         │   ┌───────────────────────────────────────────┐   │
                         │   │ OpenAI API                                │   │
                         │   ├───────────────────────────────────────────┤   │
                         │   │ ▶ GPT-4o (Text Gen)                       │   │
                         │   │ ▶ DALL-E 3 (Image Gen)                    │   │
                         │   └───────────────────────────────────────────┘   │
                         │                                                   │
                         └───────────────────────────────────────────────────┘
                         
 ```





Latency Annotations (p95 Targets):
*   Text Response (User Send -> First Token): < 2 seconds
*   Image Response (User Send -> Image Display): < 13 seconds

Security Boundaries:
*   Authentication is OUT OF SCOPE for this version. All endpoints are currently public.


### 🏗️ Component Descriptions

### 1. Frontend

-   **Technology:** React 18.2 + Vite 5.0
    
-   **Deployment:** Vercel
    
-   **Purpose:** Provides the user-facing chat interface for Dungeon Masters to interact with the ATLAS AI assistant. It is a single-page application focused on a seamless and responsive conversational experience.
    

#### Key Responsibilities:

-   **User Interface Rendering:** Renders the main chat window, message history, and text input form.
    
-   **Input Handling:** Captures user text input, disables the form while the AI is responding, and handles "send on enter" functionality.
    
-   **State Management:** Manages the application's state, including the array of conversation messages and the current loading status, using **React Context API**.
    
-   **API Communication:** Communicates with the FastAPI backend by sending the entire chat history to the /api/chat endpoint and handling the streaming response.
    
-   **Error Handling & Loading States:** Displays visual loading indicators while waiting for AI responses and shows user-friendly error messages if an API call fails.
    

#### Notable Implementation Details:

-   Uses the **react-markdown** library to properly render formatted text responses from the AI, which may include lists, bolding, or italics for emphasis.
    
-   Implements a custom React hook, **useChat**, to encapsulate the logic for sending messages, handling the streaming API response, and managing the conversation state. This keeps the main App.jsx component clean.
    
-   The Message component is designed to conditionally render either a text block (for user/AI text) or an image block (for AI-generated images), based on the content of the message object.
    

#### Key Files/Components:

```
src/
├── components/
│   ├── ChatWindow.jsx    # Container that scrolls and displays all messages
│   ├── Message.jsx       # Renders a single message bubble (user or AI, text or image)
│   └── MessageInput.jsx  # The text input form and send button
├── hooks/
│   └── useChat.js        # Custom hook managing all chat logic and API calls
├── context/
│   └── ChatContext.js    # React Context to provide chat state to components
└── App.jsx               # Main application component, orchestrates all UI elements
```

Alright, let's detail the "brain" of the operation: the Backend.

----------

### 2. Backend

-   **Technology:** FastAPI 0.104 + Python 3.11
    
-   **Deployment:** Render
    
-   **Purpose:** To act as a stateless orchestration layer between the user's chat interface and the third-party AI services. It manages the conversation context for the duration of a session and translates user requests into effective prompts for the AI models.
    

#### Key Responsibilities:

-   **API Endpoints:** Exposes a simple, robust API for the frontend to interact with.
    
-   **Authentication/Authorization:**  **None for this version.** All endpoints are public to simplify the initial development ("Walk" phase).
    
-   **Business Logic Processing:** Manages the conversation history, constructs system and user prompts, and implements the logic to decide when and how to generate images.
    
-   **AI API Integration:** Handles all communication with the OpenAI API for both text (GPT-4o) and image (DALL-E 3) generation.
    
-   **Database Operations:**  **None.** The service is stateless and does not persist any data between sessions.
    
-   **Security:** Implements CORS (Cross-Origin Resource Sharing) policies to ensure requests are only accepted from the deployed frontend's domain.
    

#### API Endpoints:


| Method | Endpoint | Purpose | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/chat` | The primary endpoint for the conversational experience. Receives the chat history and streams back the AI's response. | No |
| **GET** | `/health` | A simple health check endpoint for monitoring service uptime. Returns `{"status": "ok"}`. | No |


#### Notable Implementation Details:

-   Utilizes FastAPI's **StreamingResponse** to send the AI's text generation back to the client token-by-token. This dramatically improves the perceived performance and user experience.
    
-   Implements a **two-step image generation process**: when an image is requested, the backend first uses GPT-4o to synthesize the conversation history into a highly descriptive, optimized prompt, which is then sent to the DALL-E 3 API.
    
-   Leverages **Pydantic** for all data validation, ensuring that the request bodies from the frontend and the responses from the AI services conform to strict, type-safe schemas.
- -   **Initial State Management:** For our initial phase, the backend is stateless. It relies on the frontend to send the complete conversation history with each request. The backend will implement a **truncation strategy** to ensure the payload sent to the OpenAI API does not exceed the model's context window. We acknowledge this is not efficient for long sessions.
    

#### Key Files/Modules:

```
app/
├── main.py              # FastAPI app initialization and CORS configuration
├── routes/
│   └── chat.py          # Defines the /api/chat and /health endpoints
├── services/
│   └── ai_service.py    # Contains all logic for interacting with the OpenAI API
│                        # (prompt construction, text/image generation, streaming)
├── models/
│   └── schemas.py       # Pydantic models for API request/response validation
└── config.py            # Manages loading of environment variables (like API keys)
```

#### Future Improvements 

-   **Implement Server-Side Session Caching:**
    
    -   **Problem:** The current stateless approach is inefficient and has context limitations.
        
    -   **Solution:** Introduce a session management system. The backend will store conversation histories in an in-memory cache (e.g., a Python dictionary or Redis) keyed by a session_id. The frontend will only need to send the new message and its session_id, drastically reducing payload size and enabling session restoration on page refresh.
        

	-   Add automated testing (pytest + GitHub Actions)
	    
	-   Add monitoring/logging (Sentry)


### 4. AI Services

-   **Primary AI Service:** OpenAI API
    

#### API Configuration:

-   **Model (Text):**  **gpt-4o** will be used for all conversational tasks due to its strong reasoning, speed, and cost-effectiveness.
    
-   **Model (Image):**  **dall-e-3** will be used for all image generation tasks for its high quality and ability to follow complex descriptive prompts.
    
-   **Max Tokens (Completion):** We will set a limit of **1024** tokens for the AI's generated response to prevent overly long or rambling answers.
    
-   **Temperature:** We will use a default of **0.8** to encourage creative and varied responses, which is ideal for a DM's brainstorming tool.
    
-   **Structured Output:**  **No.** We will not use formal function calling or JSON mode for this version. We will rely on the AI's natural language output and parse it with simple keyword triggers (e.g., looking for "show me a picture of..." to initiate image generation).
    

#### Prompt Structure:

-   **System Prompt:** A detailed, multi-paragraph prompt is sent at the beginning of every conversation. It establishes the AI's persona as "ATLAS," defines its purpose, lists its capabilities, and sets important guardrails (e.g., "Do not provide game mechanics or stats").
    
-   **User Input:** The backend will send the entire conversation history (a list of user and assistant messages) as the primary context for the AI.
    
-   **Expected Output:** The AI is prompted to provide a natural language response. If an image is requested, the AI is instructed (via a meta-prompt from the backend) to first generate a rich, descriptive paragraph suitable for an image model, which the backend then intercepts and uses.
    

#### Model Selection Logic:

-   For this version, there is no dynamic model selection. gpt-4o is used for all text tasks, and dall-e-3 is used for all image tasks. The hybrid model approach (using a cheaper model for simple tasks) is noted as a potential future cost optimization.
    

#### Fallback Strategy:

-   **Primary:** OpenAI API.
    
-   **Fallback 1:** If an API call to OpenAI fails (e.g., due to a 5xx server error), the backend will retry the request once after a 2-second delay.
    
-   **Fallback 2:** If the retry fails, the backend will return a specific error message to the frontend (e.g., "AI service is currently unavailable. Please try again in a moment.") which will be displayed to the user. There is no fallback to a different AI provider in this version.
    

#### Notable Implementation Details:

-   **Caching Strategy:**  **None for this version.** We are not implementing caching for AI responses, as the creative and conversational nature of the tool means most requests will be unique. A session cache is planned for a future iteration (as noted in the Backend section).
    
-   **Rate Limiting:** We are not implementing application-level rate limiting per-user. We will be operating well within the default Tier 1 rate limits of the OpenAI API.
    
-   **Cost Tracking:** The backend will log the prompt and completion token counts for every text-based API call and the number of images generated. This data will be used to monitor our spending and validate the cost-per-session success metric.


### 5. Authentication

-   **Technology:**  **None (Out of Scope for this version).**
    
-   **Purpose:** To explicitly state that the current version of ATLAS does not require user accounts. The application is designed to be used in ephemeral, single-session instances. A future "Run" phase of the project would introduce authentication to enable features like saving campaign content and chat history across sessions. A service like **Clerk** or **Firebase Authentication** would be considered for its ease of integration and robust free tier.
    

#### Future Authentication Flow (Planned):

1.  A user would sign up/log in via an external provider (e.g., Clerk).
    
2.  The provider would return a short-lived JSON Web Token (JWT) to the frontend.
    
3.  The frontend would include this JWT in the Authorization header of all requests to the backend.
    
4.  The FastAPI backend would have middleware to validate the JWT on every protected request, ensuring only authenticated users can access the service.
    
5.  If the JWT is invalid or expired, the backend would return a 401 Unauthorized error.
    



### 6. External Services

#### Image Handling (Not Storage)

-   **Service:** OpenAI DALL-E 3 API
    
-   **Purpose:** To generate images on-the-fly based on conversational context.
    
-   **Configuration:**
    
    -   **Image URLs:** The OpenAI API returns temporary URLs for each generated image. These URLs typically expire after one hour.
        
    -   **Storage Policy:** We are **not implementing our own image storage solution** (e.g., Cloudinary, S3). This is a deliberate architectural decision to simplify the project.
        
    -   **User Responsibility:** The user is responsible for downloading any images they wish to keep permanently before the temporary URL expires. The frontend will provide a clear "Download" button for each image.
        

#### Other Services (Planned)

-   **Service Name:**  **Sentry** (or similar error tracking service)
    
-   **Purpose:** To provide real-time error tracking, monitoring, and performance insights for both the frontend and backend.
    
-   **Why Chosen:** Sentry's free tier is generous and provides invaluable insight into application health, helping us identify and fix bugs much faster than relying on manual log checking. This would be a priority to implement in a future "Run" phase.


### 🔄 Data Flow Diagrams

#### Primary User Flow: Conversational Image Generation

This flow describes the most complex interaction in ATLAS: a user requesting an image that requires the system to understand the prior conversation context.

**Diagram:**

```

┌─────────┐      ┌──────────┐       ┌─────────┐      ┌─────────┐
│  User   │      │ Frontend │       │ Backend │      │ OpenAI  │
│ Browser │      │ (React)  │       │(FastAPI)│      │   API   │
└────┬────┘      └────┬─────┘       └────┬────┘      └─────┬───┘
     │               │                   │                 │
     │ 1. Request image of NPC           │                 │
     │──────────────>│                   │                 │
     │               │ 2. POST /api/chat │                 │
     │               │ (with context)    │                 │
     │               │──────────────────>│                 │
     │               │                 │ 3. Call GPT-4o to │
     │               │                 │ create img prompt │
     │               │                 │──────────────────>│
     │               │                 │                   │ 4. Return prompt
     │               │                 │<──────────────────│
     │               │                 │ 5. Call DALL-E 3  │
     │               │                 │   with prompt     │
     │               │                 │──────────────────>│
     │               │                 │                   │ 6. Return img URL
     │               │                 │<──────────────────│
     │               │                 │ 7. Return JSON    │
     │               │                 │ (text + imgURL)   │
     │               │<────────────────│                   │
     │ 8. Display img & text           │                   │
     │<───────── ────│                 │                   │
     │               │                 │                   │`
  
```
**Latency Budget (Total Target: < 13 seconds):**

-   Frontend request handling: ~100ms
    
-   Network (Client to Backend): ~200ms
    
-   Backend (GPT-4o prompt synthesis): ~2000ms
    
-   Backend (DALL-E 3 image generation): ~10000ms
    
-   Network (Backend to Client) + Frontend Render: ~700ms
    

----------

#### Error Scenarios:

**Scenario 1: OpenAI API is unavailable or returns an error (5xx).**

1.  Backend makes the initial call to OpenAI. It fails.
    
2.  Backend automatically retries the request once after a 2-second delay.
    
3.  The second request also fails.
    
4.  Backend returns a 503 Service Unavailable status to the frontend with a clear error message: "The AI service is currently experiencing issues. Please try again in a few moments."
    
5.  Frontend receives this error and displays a user-friendly "toast" notification with the message. The input form is re-enabled.
    

**Scenario 2: User request is flagged by OpenAI's content safety filter.**

1.  User types a prompt that violates OpenAI's safety policies.
    
2.  Backend sends the request to the OpenAI API.
    
3.  OpenAI API returns a 400 Bad Request error with a safety_filter violation.
    
4.  Backend catches this specific error and returns a 400 status to the frontend with a generic, non-judgmental message: "Sorry, I can't fulfill that request. Please try a different prompt."
    
5.  Frontend displays this message to the user in the chat window as if it were an AI response.
    

----------

#### Secondary Flow: Standard Text Conversation

This is the most common user flow. It is much simpler and must be highly performant.

1.  User types a message (e.g., "Give me a name for a fantasy tavern") and hits Enter.
    
2.  Frontend sends the current conversation history to the /api/chat endpoint.
    
3.  Backend receives the history, constructs a single prompt for GPT-4o, and makes one API call.
    
4.  As soon as the first tokens are received from the OpenAI API, the backend begins streaming the response back to the frontend.
    
5.  The frontend receives the streaming text and displays it in real-time in the chat window, creating a "typing" effect.
    
6.  The connection is closed once the AI finishes its response. **Target latency for the first token is < 2 seconds.**


### ⚡ Performance & Latency

#### Latency Budget



| Component | Target (P95) | Current (Est. Week 4) | Status | Optimization Plan |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Load Time** | < 1.5s | ~1.2s | ✅ Good | No immediate action needed. Keep bundle size small. |
| **API Text Response** | < 2s | ~2.5s | ⚠️ Needs Work | Monitor GPT-4o TTFT (Time To First Token). If consistently slow, consider a faster model (e.g., GPT-3.5-Turbo) as a fallback. |
| **API Image Response**| < 13s | ~15s | ⚠️ Needs Work | DALL-E 3 generation time is the main factor. Focus on optimizing the user experience with clear loading states and progress indicators. |


**Overall User Experience Target:**

-   **Conversational Flow:** The time from a user sending a message to the first word of the AI's response appearing should feel nearly instant (< 2 seconds).
    
-   **Creative Visuals:** The time from requesting an image to it being displayed should be under 13 seconds, fast enough to keep the user engaged in their creative process.
    

#### Scalability Considerations

**Current Capacity:**

-   **Expected Users:** Designed for a small number of concurrent users (~1-5), primarily the development team and user testers.
    
-   **Expected Requests:** Low volume, likely less than 100 API calls per day during development.
    
-   **Backend Memory:** The stateless design has a very low memory footprint, well within the 512MB offered by Render's free tier.
    

**Scaling Bottlenecks:**

1.  **Cost:** This is the primary bottleneck. The pay-per-use API model does not scale cost-effectively without a monetization strategy. Our $0 budget is the hard limit.
    
2.  **API Rate Limits:** While our current usage is low, a sudden increase in users would quickly hit OpenAI's default Tier 1 rate limits.
    
3.  **Stateless Backend Inefficiency:** The current approach of sending the entire chat history with each request will become a CPU and network bottleneck in very long sessions or with many concurrent users.
    
4.  **Host "Spin-Down":** The free tier on Render can "spin down" the backend service during periods of inactivity, leading to a slow "cold start" (15-30 seconds) for the first user who arrives after a pause.
    

**Scaling Strategy (If Needed Post-Course):**

-   **Implement Server-Side Caching:** The first and most critical step would be to introduce a Redis cache for session management, as planned. This solves the stateless inefficiency bottleneck.
    
-   **Upgrade Hosting Tiers:** Move to paid plans on Render to prevent service spin-down and get more CPU/memory resources.
    
-   **Introduce User-Level Rate Limiting:** Implement logic in the backend to limit the number of requests a single user can make per hour to manage costs and prevent abuse.
    
-   **Apply for Higher API Tiers:** If the user base grows, we would apply for higher rate limits from OpenAI.

### 🔒 Security Architecture

#### Security Layers

**Layer 1: Frontend (Client-Side)**

-   **HTTPS Only:** The application will be deployed on Vercel, which enforces HTTPS, encrypting all traffic between the user's browser and the server.
    
-   **No API Keys Exposed:** All API keys and secrets are handled exclusively by the backend. The frontend code contains no sensitive credentials.
    
-   **Cross-Origin Resource Sharing (CORS):** The frontend will respect CORS policies set by the backend.
    

**Layer 2: Backend (Server-Side)**

-   **CORS Configuration:** The FastAPI backend is configured to only accept requests from the specific domain of our deployed frontend (e.g., https://atlas-dm-tool.vercel.app). This prevents other malicious websites from making requests to our API.
    
-   **Input Sanitization:** While not a primary focus, basic checks will be in place to handle malformed JSON requests gracefully.
    
-   **API Key Management:** The OpenAI API key is loaded securely from an environment variable and is never hardcoded in the source code.
    
-   **Error Handling:** The backend is configured to not leak detailed internal error messages or stack traces to the client in a production environment.
    

**Layer 3: External Services (OpenAI API)**

-   **API Key Security:** The API key is the sole credential for accessing the OpenAI service. It will be stored securely in our hosting provider's environment variables.
    
-   **Least Privilege:** We are using a single API key, but in a larger system, we would create separate keys with specific permissions for different services.
    

#### Threat Model

**Threats Considered:**

-   **API Key Theft**
    
    -   **Description:** An attacker gains access to our OpenAI API key, allowing them to make fraudulent requests on our account.
        
    -   **Mitigation:** API key is only stored in environment variables on the secure backend server and in a local .env file that is explicitly listed in .gitignore. It is never committed to version control.
        
    -   **Status:** 
        
-   **Denial of Service (DoS) / Resource Exhaustion**
    
    -   **Description:** A malicious actor spams the /api/chat endpoint, causing a flood of expensive API calls to OpenAI and driving up our costs.
        
    -   **Mitigation:** The free hosting tier and public nature of the app make this a plausible risk. For this project's scope, we will rely on **manual monitoring** of our OpenAI usage dashboard. A production-ready version would implement IP-based rate limiting.
        
    -   **Status:** ⚠️ Acknowledged Risk (Mitigation planned for "Run" phase)
        
-   **Prompt Injection**
    
    -   **Description:** A user crafts a malicious prompt to make the AI ignore its system instructions and reveal its system prompt or generate unintended content.
        
    -   **Mitigation:** The impact is low for our application (no sensitive data to leak). We will use prompt engineering techniques like clear role delineation and instruction separation to make the AI more robust against this.
        
    -   **Status:** 
        
-   **Cross-Site Scripting (XSS)**
    
    -   **Description:** The AI generates a response containing malicious JavaScript, which the frontend then renders, potentially stealing user data.
        
    -   **Mitigation:** We are using **react-markdown** instead of dangerously setting raw HTML (dangerouslySetInnerHTML). The react-markdown library automatically sanitizes output and prevents script execution by default.
        
    -   **Status:** 


#### Cost Breakdown (Monthly Estimate)

| Service | Free Tier | Target Usage (Monthly) | Estimated Monthly Cost | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel (Frontend)** | ✅ Generous Hobby Tier | ~100-200 deploys/builds | **$0** | Usage is well within the limits of the free hobby tier. |
| **Render (Backend)** | ✅ Free Web Service | Low, intermittent traffic | **$0** | Free tier service spins down with inactivity, causing occasional "cold starts". |
| **OpenAI API** | ❌ Pay-as-you-go | ~300-500 test sessions | **~$30 - $35** | This is the primary cost. Goal is to cover this with student/cloud credits. |
| **Authentication** | N/A | 0 users | **$0** | Out of scope for initial phase. Future solutions (Clerk, Firebase) have free tiers. |
| **Image Storage** | N/A | 0 images stored | **$0** | Out of scope. We are using temporary, expiring URLs from the DALL-E API. |
| **TOTAL** | | | **~$30 - $35** | **Target cost to team:** |

Alright, let's break down the financial plan for ATLAS. This section is crucial for demonstrating that you've considered the real-world operational costs of your application, even within a student project context.

----------

### 💰 Cost Architecture

#### Cost Breakdown (Monthly Estimate)

Service

Free Tier

Target Usage (Monthly)

Estimated Monthly Cost

Notes

**Vercel (Frontend)**

✅ Generous Hobby Tier

~100-200 deploys/builds

**$0**

Usage is well within the limits of the free hobby tier.

**Render (Backend)**

✅ Free Web Service

Low, intermittent traffic

**$0**

Free tier service spins down with inactivity, causing occasional "cold starts".

**OpenAI API**

❌ Pay-as-you-go

~300-500 test sessions

**~$30 - $35**

This is the primary cost. Goal is to cover this with student/cloud credits.

**Authentication**

N/A

0 users

**$0**

Out of scope for "Walk" phase. Future solutions (Clerk, Firebase) have free tiers.

**Image Storage**

N/A

0 images stored

**$0**

Out of scope. We are using temporary, expiring URLs from the DALL-E API.

**TOTAL**

**~$30 - $35**

**Target cost to team: $0** (covered by credits).

#### Cost Optimizations

We are implementing several strategies to actively manage and minimize our primary cost driver, the OpenAI API usage:

1.  **Strategic Model Selection:** Our choice of **GPT-4o** over the older, more expensive GPT-4 models is a primary cost-saving measure. It provides a near-equivalent level of quality at a fraction of the price and with lower latency.
    
2.  **Efficient Prompt Engineering:** We are carefully designing our system prompts and the logic for generating image prompts to be as concise as possible. Reducing the number of input tokens sent with each request directly lowers costs.
    
3.  **Response Length Capping:** By setting a max_tokens limit on the AI's completion, we prevent unexpectedly long (and expensive) responses, ensuring a predictable cost ceiling for each API call.
    
4.  **Future Caching Implementation:** The planned move to a server-side session cache (as mentioned in the "Architecture Evolution" section) is the most significant future cost optimization. It will prevent the costly re-sending of the entire conversation history with every turn, drastically reducing input token consumption in longer sessions.
    
5.  **Image Generation Resolution:** We will consistently request images at the standard 1024x1024 resolution, which is the most cost-effective option provided by the DALL-E 3 API.


### 🔄 Architecture Evolution

#### Changes from Week 2 (Proposal) to Week 4 (This Document)



| Component | Week 2 Plan | Week 4 Decision | Reason for Change |
| :--- | :--- | :--- | :--- |
| **Backend Framework**| Python (FastAPI/Flask) | **FastAPI** | Solidified the choice for FastAPI due to its native `async` support, which is essential for efficiently streaming AI responses, and its automatic API documentation features. |
| **State Management** | Undefined | **Stateless Backend** | Made a conscious decision to start with a simple stateless architecture where the client sends the full context. This simplifies the initial build ("Walk" phase) and avoids database/cache dependencies early on. |
| **AI Text Model** | GPT-4 Family | **GPT-4o** | Specifically selected GPT-4o as our primary model. It offers a superior balance of speed, cost, and intelligence compared to older GPT-4 models, making it ideal for our real-time chat application. |
| **Deployment Platform**| Undecided (e.g., Heroku) | **Vercel (FE) + Render (BE)** | Chose modern platforms with excellent free tiers, seamless Git integration, and easy environment variable management. Heroku's free tier was discontinued, making these better alternatives. |
| **Error Handling** | Generic | **Specific Scenarios** | Moved from a vague idea of "handling errors" to defining specific failure modes (API downtime, content filtering) and the exact user-facing messages for each. |
#### Future Improvements 

**Weeks 5-7: Foundational Robustness**

- [ ]  **Implement Server-Side Session Caching:** This is the highest priority architectural change. We will move from the inefficient stateless model to a session-based cache (likely using Redis or a simple in-memory dictionary on Render). This will dramatically improve performance and scalability for longer conversations.
    
- [ ] **Add Automated Backend Testing:** Introduce pytest to our CI/CD pipeline. We will start with unit tests for our ai_service.py logic and integration tests for our /api/chat endpoint to ensure reliability as we add features.
    

**Weeks 8-10: Monitoring and Hardening**

- [ ]  **Integrate Error Monitoring:** Add a service like Sentry to our application. This will provide real-time alerts for backend errors and frontend exceptions, allowing us to identify and fix bugs proactively.
    
- [ ]  **Refine Security & Prompts:** Conduct prompt injection testing ("red teaming") to harden our system prompt against manipulation. Implement more robust input handling on the backend.
    

**Weeks 11-13: Performance and Polish**

- [ ]  **Performance Profiling:** Analyze the end-to-end latency of our API calls. Identify any non-AI bottlenecks in our own code and optimize them.
    
- [ ] **Finalize Documentation:** Create comprehensive API documentation (leveraging FastAPI's auto-docs) and a detailed README.md to ensure the project is understandable and maintainable.


### 🛠️ Development & Deployment

#### Local Development Setup

**Requirements:**

-   Node.js v18.x or later
    
-   Python 3.11 or later
    
-   Git
    

**Setup Steps:**


```
 # 1. Clone the repository from GitHub
git clone https://github.com/[your-org]/atlas.git
cd atlas

# 2. Configure backend environment variables
cd backend
cp .env.example .env
# Now, edit the .env file and add your OpenAI API key

# 3. Install backend dependencies and set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

# 4. In a separate terminal, set up the frontend
cd ../frontend
cp .env.example .env.local
# The .env.local file should point to the local backend URL by default

# 5. Install frontend dependencies
npm install
```
  

**Running the Application:**
```
# To run the backend server (from the 'backend' directory):
# This will start the server on http://localhost:8000
uvicorn app.main:app --reload

# To run the frontend dev server (from the 'frontend' directory):
# This will start the frontend on http://localhost:5173
npm run dev`
```
  

**Environment Variables:**
```
code Code

    `# Backend (.env)
OPENAI_API_KEY="sk-..."

# Frontend (.env.local)
VITE_API_URL="http://localhost:8000"`
```

----------

#### Deployment Pipeline

**Current Deployment (Manual Push-to-Deploy):**

-   **Frontend (Vercel):**
    
    -   The Vercel project is linked to our GitHub repository's main branch.
        
    -   Any push or merge to the main branch automatically triggers a new deployment on Vercel.
        
    -   Vercel also provides automatic preview deployments for every pull request, allowing us to test changes before merging.
        
-   **Backend (Render):**
    
    -   The Render project is also linked to our GitHub repository's main branch.
        
    -   A push to main triggers a new build and deployment of our FastAPI service.
        
    -   Environment variables (like OPENAI_API_KEY) are configured securely in the Render dashboard, not in the repository.
        

**CI/CD Pipeline (Planned for Week 8+):**

1.  A developer pushes a feature branch and opens a pull request on GitHub.
    
2.  **GitHub Actions** is automatically triggered.
    
3.  The workflow runs a series of checks:
    
    -   **Linting:** Runs ESLint on the frontend and Black / Ruff on the backend to enforce code style.
        
    -   **Unit Tests:** Runs Vitest for the frontend and pytest for the backend.
        
4.  If all checks pass, the PR can be reviewed and merged.
    
5.  Merging to main triggers the Vercel and Render auto-deployments to production.


### 🧪 Testing Strategy

#### Testing Layers

Our testing strategy is a pyramid: a wide base of fast unit tests, a smaller layer of integration tests, and a very focused set of manual end-to-end tests.

**Frontend Tests (Planned):**

-   **Unit Tests (Vitest + React Testing Library):**
    
    -   **Focus:** Test individual React components in isolation.
        
    -   **Examples:**
        
        -   Does the MessageInput component become disabled when a isLoading prop is true?
            
        -   Does the Message component correctly render an <img> tag when the message object contains an imageUrl?
            
    -   **Goal:** Ensure UI components behave correctly based on their props and state.
        
-   **Integration Tests (Manual for now, Playwright planned):**
    
    -   **Focus:** Test how multiple components work together in a real user flow.
        
    -   **Example:** Can a user type a message, send it, see a loading indicator, and then see the AI's response appear correctly in the ChatWindow?
        
    -   **Goal:** Verify critical user journeys within the frontend application.
        

**Backend Tests (Planned):**

-   **Unit Tests (pytest):**
    
    -   **Focus:** Test individual functions and business logic in isolation, without making real network calls.
        
    -   **Examples:**
        
        -   Does our truncation logic correctly shorten a long conversation history?
            
        -   Does the prompt construction logic correctly format the system prompt and user messages?
            
    -   **Goal:** Ensure the core logic of our services is correct. We will use pytest-mock to simulate responses from the OpenAI API.
        
-   **Integration Tests (pytest + HTTPX):**
    
    -   **Focus:** Test the full request/response cycle of our API endpoints.
        
    -   **Example:** Send a POST request with a sample chat history to the /api/chat endpoint and assert that we receive a 200 OK status and a valid streaming response.
        
    -   **Goal:** Ensure our API routes, request validation (Pydantic), and service layers are correctly wired together.
        

**End-to-End (E2E) Tests (Manual):**

-   **Focus:** Test the entire application flow from the user's perspective, from opening the webpage to receiving a multi-modal (text + image) response.
    
-   **Methodology:** Our **User Study Plan (Section 7)** serves as our primary E2E testing framework. Real users interacting with the application will provide the most valuable feedback on whether the system works as a cohesive whole.
    
-   **Goal:** Confirm that the integrated frontend and backend systems deliver a functional and valuable user experience.

### 📊 Monitoring & Observability

While extensive monitoring is a "Run" phase feature, our architecture is designed from the start to be observable. Our initial focus is on logging critical information.

#### Logging Strategy

**What We Log:**

-   **API Requests:** All incoming requests to the backend (method, endpoint, timestamp).
    
-   **Errors:** Any unhandled exceptions or server errors (5xx status codes) will be logged with their full stack traces to facilitate debugging.
    
-   **AI API Calls:** This is the most critical data. For every call to OpenAI, we will log:
    
    -   The model used (gpt-4o or dall-e-3).
        
    -   The number of prompt and completion tokens.
        
    -   The calculated cost of the individual call in USD.
        
    -   The latency of the API call in milliseconds.
        
-   **Session Information:** While we don't have users, we plan to implement a session_id to correlate logs belonging to a single user's conversation.
    

**Where Logs Go:**

-   **Development:** Logs will be printed directly to the console for easy debugging during local development.
    
-   **Production (Planned):** In a future iteration (Weeks 8-10), we will integrate a service like **Sentry**. This will allow us to aggregate logs, get real-time error alerts, and monitor performance centrally without needing to manually check server logs.
    

**Log Format (Structured JSON):**

We will use structured JSON for our logs, as it is machine-readable and easy to query in a logging service.



  ```{
  "timestamp": "2025-10-31T10:30:00Z",
  "level": "INFO",
  "session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "endpoint": "/api/chat",
  "latency_ms": 2345,
  "ai_service": "openai",
  "model": "gpt-4o",
  "tokens": {
    "prompt": 512,
    "completion": 256,
    "total": 768
  },
  "cost_usd": 0.00384
}`
```
  

----------

#### Metrics Dashboard (Planned)

While we will not build a dedicated dashboard in the "Walk" phase, we will leverage built-in analytics and plan for a more robust solution.

**Key Metrics to Track:**

-   **Usage:** Daily/hourly request volume to the /api/chat endpoint.
    
-   **Performance:** Average and p95 latency for API responses (both text and image).
    
-   **Quality:** (Future) Track user clicks on the "regenerate" button as a proxy for low-quality responses.
    
-   **Cost:** Total daily and cumulative cost of OpenAI API calls. This is our most important metric to monitor.
    
-   **Reliability:** API error rate (percentage of 5xx responses).
    

**Dashboard Tool:**

-   **Frontend:** We will use **Vercel Analytics** out-of-the-box to get basic metrics on page views and user geography.
    
-   **Backend (Planned):** The planned **Sentry** integration would provide a dashboard for error rates, transaction latencies, and other key performance indicators. The cost metric would initially be tracked via our custom logs and the OpenAI dashboard.


### 🔧 Architecture Decisions

This section summarizes the most critical technical choices we've made and the reasoning behind them, acknowledging the trade-offs involved.

#### Key Decisions & Tradeoffs

**Decision 1: FastAPI (Backend) vs. Flask**

-   **Chose:**  **FastAPI**
    
-   **Pro:** Native asynchronous support is critical for efficiently handling streaming API responses. Automatic data validation with Pydantic and auto-generated API docs (Swagger UI) significantly improve developer experience and code quality.
    
-   **Con:** Has a slightly smaller community and fewer tutorials than Flask.
    
-   **Tradeoff:** We accepted a slightly steeper learning curve in exchange for superior performance and modern development features that are perfectly suited for an AI-centric, I/O-bound application.
    

**Decision 2: Stateless Backend vs. Session-Based Cache**

-   **Chose:**  **Stateless Backend (for initial implementation)**
    
-   **Pro:** Drastically simplifies the initial architecture ("Walk" phase). There is no need to manage or deploy a separate database or cache, allowing us to focus entirely on the core AI logic.
    
-   **Con:** Inefficient for long conversations due to large payloads and susceptible to context loss if a user refreshes the page.
    
-   **Tradeoff:** We are intentionally accepting short-term inefficiency to accelerate initial development and de-risk the core AI functionality. A move to a session-based cache (Redis) is the highest-priority item in our "Future Improvements" roadmap.
    

**Decision 3: OpenAI API vs. Open-Source Models**

-   **Chose:**  **OpenAI API (GPT-4o, DALL-E 3)**
    
-   **Pro:** Provides state-of-the-art quality, speed, and reliability with a simple, managed API. This allows us to focus on the application layer instead of infrastructure and model hosting.
    
-   **Con:** Creates a vendor lock-in and a direct, pay-per-use cost, which is a key project constraint.
    
-   **Tradeoff:** We accepted the cost and vendor dependency in exchange for the highest possible quality of generation, which is essential for the product's core value proposition. We have a contingency plan to pivot to open-source models if we cannot secure funding.
    

**Decision 4: No Authentication vs. Implementing User Accounts**

-   **Chose:**  **No Authentication**
    
-   **Pro:** Massively reduces scope and complexity. Avoids the need to manage user data, passwords, and database schemas, which are not core to the AI experience.
    
-   **Con:** Prevents features that require user persistence, such as saving conversations or campaign content.
    
-   **Tradeoff:** We chose to deliver a high-quality, single-session tool rather than a mediocre multi-session one. Adding authentication (e.g., via Clerk) is a primary goal for the "Run" phase.
    

----------

### 📚 References & Resources

**Architecture Patterns Used:**

-   Client-Server Architecture
    
-   REST API Design Principles
    
-   Stateless Service (initial design)
    
-   Service Layer Pattern (in the backend to separate API routing from business logic)
    

**Key Documentation:**

-   FastAPI: [https://fastapi.tiangolo.com/](https://www.google.com/url?sa=E&q=https%3A%2F%2Ffastapi.tiangolo.com%2F)
    
-   React: [https://react.dev/](https://www.google.com/url?sa=E&q=https%3A%2F%2Freact.dev%2F)
    
-   OpenAI API Documentation: [https://platform.openai.com/docs](https://www.google.com/url?sa=E&q=https%3A%2F%2Fplatform.openai.com%2Fdocs)
    
-   Vercel Documentation: [https://vercel.com/docs](https://www.google.com/url?sa=E&q=https%3A%2F%2Fvercel.com%2Fdocs)
    
-   Render Documentation: [https://render.com/docs](https://www.google.com/url?sa=E&q=https%3A%2F%2Frender.com%2Fdocs)
    

----------

### ✅ Architecture Review Checklist

This checklist confirms that all required elements of the architecture document have been addressed.

- [x]  **All components documented** (Frontend, Backend, AI Services)

- [x] **Data flows clearly shown** (Primary and secondary user flows, error scenarios)

- [x] **Technology choices justified** (In "Architecture Decisions" section)

- [x] **Security considerations addressed** (In "Security Architecture" section)

- [x] **Performance targets defined** (In "Performance & Latency" section)

- [x] **Cost breakdown provided** (In "Cost Architecture" section)

- [x] **Scalability considerations noted** (In "Performance & Latency" section)

- [x] **Error handling strategy defined** (In "Data Flow Diagrams" section)

- [x] **Testing strategy outlined** (In "Testing Strategy" section)

- [x] **Deployment process documented** (In "Development & Deployment" section)

**Version:** 2.0  
**Last Updated:** Week 4, 31/10/2025  
**Next Review:** Week 10 (before final optimization push)
