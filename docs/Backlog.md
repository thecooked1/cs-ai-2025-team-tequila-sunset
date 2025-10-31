
### **Prioritized Backlog**

**Project Name:** ATLAS: A Conversational AI Assistant for Dungeon Masters  
**Last Updated:** Week 4, 31/10/2025
**Sprint:** Week 4 of 13

----------

### 📋 Backlog Overview

**Total Issues:** 11  
**P1 (Must Have):** 5 issues  
**P2 (Should Have):** 4 issues  
**P3 (Nice to Have):** 2 issues  
**Completed:** 0 issues

**Current Sprint Focus:** Building the foundational frontend and backend services and establishing the core communication between them. The goal is to have a non-functional UI connected to a backend that can make a simple API call.

----------

### 🔴 Priority 1: Critical Path (Must Have for MVP)

These features are non-negotiable for the final demo. If we don't build these, ATLAS does not function.

----------

### **Issue #1: Setup Backend with Health Check**

**Status:** 🔵 To Do  
**Assigned:** [Backend/AI Lead]  
**Due:** Week 3  
**Effort:** Small (2-4 hrs)

**User Story:**

> As a developer, I want to set up the basic FastAPI application and deploy it so that the frontend has a live endpoint to connect to.

**Why This Is P1:**  
The backend server is the foundation of the entire application. Without a running and deployable server, no other development can proceed.

**Acceptance Criteria:**

A FastAPI application is created.

A /health endpoint exists and returns {"status": "ok"} with a 200 status code.

The application is successfully deployed to Render and is publicly accessible.

----------

### **Issue #2: Create Frontend UI Shell**

**Status:** 🔵 To Do  
**Assigned:** [Frontend Lead]  
**Due:** Week 4  
**Effort:** Medium (4-8 hrs)

**User Story:**

> As a developer, I want to create the basic React application with static UI components for the chat so that I have a visual structure to wire up the application logic.

**Why This Is P1:**  
The UI shell is the skeleton of the user experience. All user interactions will be built on top of these core visual components.

**Acceptance Criteria:**

A React application is initialized using Vite.

A static ChatWindow component is created that can display a hardcoded list of messages.

A static MessageInput component exists with a text area and a send button.

The basic layout is in place and deployed to Vercel.

----------

### **Issue #3: Implement Core Text Chat Loop**

**Status:** 🔵 To Do  
**Assigned:** [Backend/AI Lead] & [Frontend Lead]  
**Due:** Week 5  
**Effort:** Large (8+ hrs)

**User Story:**

> As a Dungeon Master, I want to send a message and receive a text response from the AI so that I can have a basic conversation with ATLAS.

**Why This Is P1:**  
This is the absolute core functionality of the application. It validates our entire technical architecture and proves the fundamental concept works end-to-end.

**Acceptance Criteria:**

Frontend can send a POST request to the backend's /api/chat endpoint with the conversation history.

Backend receives the request and correctly calls the OpenAI GPT-4o API.

Backend successfully receives a response from OpenAI.

Backend sends the AI's full text response back to the frontend.

Frontend correctly displays the AI's response in the chat window.

**Technical Requirements:**

-   FastAPI endpoint /api/chat that accepts a list of message objects.
    
-   Pydantic models for request and response validation.
    
-   ai_service module in the backend to handle OpenAI API calls.
    
-   useChat hook in the frontend to manage the API request state (loading, error, success).
    

**Definition of Done:**

Code written and committed for both frontend and backend.

A basic integration test is performed manually to validate the end-to-end flow.

Code reviewed by another team member.

Deployed and tested on the staging (Vercel/Render) environment.

**Dependencies:**

-   **Blocked By:** Issue #1 (Backend Setup), Issue #2 (Frontend UI Shell)
    

----------

### **Issue #4: Implement Initial System Prompt**

**Status:** 🔵 To Do  
**Assigned:** [AI/Visuals Lead]  
**Due:** Week 5  
**Effort:** Small (2-4 hrs)

**User Story:**

> As a Dungeon Master, I want the AI to respond in the persona of a helpful, creative DM assistant so that the conversation feels thematic and useful.

**Why This Is P1:**  
The system prompt defines the AI's personality and purpose. Without it, the AI is just a generic chatbot and fails to deliver the specific value proposition of ATLAS.

**Acceptance Criteria:**

A V1 system prompt is written that defines the "ATLAS" persona.

The backend correctly prepends this system prompt to all conversations sent to the OpenAI API.

AI responses demonstrably follow the persona (e.g., creative, fantasy-focused, no game mechanics).

----------

### **Issue #5: Implement Image Generation Flow**

**Status:** 🔵 To Do  
**Assigned:** [AI/Visuals Lead]  
**Due:** Week 6  
**Effort:** Large (8+ hrs)

**User Story:**

> As a Dungeon Master, I want to ask ATLAS to show me a picture of something we discussed so that I can get visual inspiration for my game.

**Why This Is P1:**  
Image generation is a core feature and a major "wow" factor for the application. It's a key part of the promised functionality.

**Acceptance Criteria:**

The backend can detect a user's intent to generate an image from their message.

The backend successfully performs the two-step process: using GPT-4o to create an image prompt, then calling DALL-E 3.

The DALL-E 3 image URL is returned to the frontend.

The frontend correctly displays the generated image in the chat window.

----------

### 🟡 Priority 2: Enhanced Features (Should Have)

If we complete all P1s, we will work on these in order to create a polished and truly useful product.

### **Issue #6: Implement Streaming Text Response**

-   **User Story:** As a DM, I want to see the AI's response appear word-by-word so that the app feels faster and more interactive.
    
-   **Why P2:** This is the single biggest improvement to the user experience after the core loop is functional.
    

### **Issue #7: Add "Copy Text" and "Download Image" Buttons**

-   **User Story:** As a DM, I want to easily copy the generated text and download the images so that I can use them in my own notes or VTT.
    
-   **Why P2:** This makes the application a truly useful tool rather than just a fun demo.
    

### **Issue #8: Implement Foundational UI/UX Styling**

-   **User Story:** As a DM, I want the application to have a clean, visually appealing, and intuitive interface so that it's enjoyable to use.
    
-   **Why P2:** A good interface makes the product feel professional and complete. We will use a CSS framework like TailwindCSS.
    

### **Issue #9: Display User-Friendly Error Messages**

-   **User Story:** As a DM, when something goes wrong, I want to see a clear and helpful error message so that I know what happened and can try again.
    
-   **Why P2:** Proper error handling is key to a robust and non-frustrating user experience.
    

----------

### 🟢 Priority 3: Nice-to-Have (Could Have)

Features to be considered only if all P1 and P2 issues are complete and stable.

### **Issue #10: Render Markdown in AI Responses**

-   **Description:** The AI often uses Markdown (e.g., for lists, bolding). This feature would render it as formatted HTML in the chat.
    

### **Issue #11: "Clear Conversation" Button**

-   **Description:** A simple button to reset the chat history on the frontend and start a new conversation.
    

----------

### 🚫 Rejected / Cut Features

Features we have explicitly decided not to build for this project's scope.

-   **User Accounts & Persistent Storage:** Cut because the complexity of managing user data, databases, and authentication is far beyond the scope of our "Walk" phase.
    
-   **Multiplayer Functionality:** Cut because it introduces immense real-time complexity (WebSockets, state synchronization) and is part of our long-term "Fly" vision.
    
-   **Complex Game Mechanics (Stats/Dice Rolls):** Cut because our goal is to be a narrative assistant, not a rule system emulator.
