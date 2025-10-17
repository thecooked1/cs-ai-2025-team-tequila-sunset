# Capstone Proposal

**Course:** Building AI-Powered Applications  
**Team Name:** Tequila Sunset  
**Project Title:** ATLAS
**Date:** 17/10/2025

----------

## 1. Problem Statement

### The Problem

Being a Dungeon Master (DM) for a tabletop role-playing game is an immensely rewarding creative endeavor, but it is also exceptionally demanding. The barrier to entry is notoriously high; a DM's responsibilities are vast, encompassing world-building, plot creation, non-player character (NPC) development, encounter design, and real-time improvisation. This significant time commitment leads to a shortage of willing DMs within social circles and can cause creative burnout. Consequently, a market for professional, for-hire DMs has emerged, but their services are often costly, creating a significant financial barrier that excludes many aspiring players from the hobby.

Even the most advanced digital alternatives cannot replicate the core magic of a TTRPG: infinite player agency. Games like Baldur's Gate 3 and Disco Elysium are masterclasses in digital storytelling, offering immense freedom within their meticulously crafted worlds. However, they are ultimately finite, operating within a bounded possibility space of pre-scripted quests and dialogue trees. They cannot react to a truly unexpected player action in the way a human DM can. Similarly, existing tools for DMs—pre-written adventure modules and random online generators—are often static and fragmented, failing to support the organic, conversational flow of creative brainstorming and forcing DMs to piece together generic content.

This problem is an ideal fit for an AI-powered solution. A conversational AI, built on a powerful Large Language Model (LLM), can serve as a true creative partner, bridging the gap between the static nature of current tools and the dynamic improvisation of a human DM. It can understand context, build upon ideas collaboratively, and act as an "improvisation engine" when players go off-script. By integrating text and image generation within a single conversational interface, ATLAS can provide DMs with a seamless tool that streamlines their workflow, combats creative block, and helps them create richer worlds. This project serves as the foundational "engine" for a much larger vision: a fully autonomous AI that can eventually run games itself.



----------

### Scope



**What's In Scope:**

-   **Core Feature: A Conversational AI Assistant:** A web-based chat interface where a Dungeon Master can interact with an AI assistant in natural language to brainstorm and generate TTRPG content.
-   **Context-Aware Content Generation:** The AI will perform creative tasks within the conversation, such as creating NPCs, describing locations, brainstorming plot hooks, and acting as an improvisation aid.
-   **Integrated "In-Chat" Image Generation:** The DM can request an image for any concept discussed (e.g., "Show me what that castle looks like"), which will be generated and displayed directly in the chat.
-   **Session-Based Memory:** The AI will maintain the context of the current conversation, allowing the DM to refer back to and refine previously generated ideas.
-   **DM Utility Features:** The interface will include simple tools to copy generated text and download images for use in the DM's preferred note-taking or virtual tabletop (VTT) software.

**Out of Scope Long Term Plans:**


-   **Persistent Campaign Memory:** Introduce user accounts and a database to allow the AI to remember a DM's entire campaign world across multiple sessions, becoming a true "campaign co-pilot."
    
-   **Structured Data Management:** Evolve from a pure chatbot to a system that can understand and manage structured entities (e.g., linking an NPC to a specific town, tracking relationships between characters).
    
-   **VTT Integration:** Develop plugins or direct integrations with popular platforms like Roll20 or Foundry VTT to push generated content and images directly into the DM's game space.

-   **Autonomous AI Dungeon Master:** Leverage the perfected engine to create a player-facing version where the AI runs the entire game.
    
-   **State-Driven Narrative:** The AI would manage the complete game state, including player locations, inventory, and world events, ensuring a persistent and coherent adventure.
    
-   **Multiplayer Support:** Enable multiple players to join a single session run by the AI DM, creating a fully automated TTRPG experience.


**Why This Scope Makes Sense:** This scope is tightly focused on delivering a high-impact, polished tool that solves the most immediate and painful problems for Dungeon Masters: time-consuming preparation and creative block. By concentrating on a conversational interface with session-based memory, we can create an intuitive and powerful user experience without the significant overhead of database management and user accounts. This allows us to dedicate our full attention to the core technical challenges of prompt engineering, context management, and multimodal AI integration, ensuring we can deliver a complete and valuable product within the project's timeframe.

----------

## 2. Target Users

[](https://github.com/ZA-KIU/AI-POWERED-SOFTWARE-DEV/blob/main/course-pack/labs/lab-2/templates/capstone-proposal-template.md#2-target-users)


## 2. Target Users

### Primary User Persona

**User Type:** Dungeon Masters (DMs) / Game Masters (GMs) of tabletop role-playing games, ranging from first-time hobbyists to experienced veterans.

**Demographics:**

-   **Age range:** 20-45
    
-   **Technical proficiency:** Moderately to highly tech-savvy. Comfortable using web applications, Discord, and digital tools like virtual tabletops (VTTs), but are not necessarily developers.
    
-   **Context of use:** Primarily used on a desktop or laptop computer during two key phases:
    
    1.  **Session Preparation:** In dedicated blocks of time (1-4 hours) before a game session to build out the world, characters, and plot.
        
    2.  **Live Gameplay:** In short, rapid bursts during a game session to improvise when players take unexpected actions.
        

**User Needs:**

1.  **Need #1: To efficiently generate high-quality, non-generic content.**
    
    -   **Why it matters:** Creating unique NPCs, compelling locations, and interesting plot hooks is the most time-consuming part of DMing. Reducing this prep time allows for more frequent or higher-quality game sessions.
        
    -   **Current workaround:** Manually writing everything from scratch, or using a fragmented collection of static online generators, random tables, and pre-written adventure modules which often feel generic or disconnected.
        
2.  **Need #2: To overcome creative blocks and find inspiration.**
    
    -   **Why it matters:** Staring at a blank page is a common problem that can lead to DM burnout and stalled campaigns. A spark of inspiration is often needed to get the creative process moving.
        
    -   **Current workaround:** Browsing Reddit, Pinterest, fantasy art sites, or reading books for inspiration, which is an unfocused and often inefficient process.
        
3.  **Need #3: To have a powerful tool for on-the-fly improvisation.**
    
    -   **Why it matters:** Players will inevitably do something the DM didn't prepare for. A long pause while the DM thinks or scrambles for notes can break player immersion and the flow of the game.
        
    -   **Current workaround:** Relying purely on mental improvisation (which is difficult and stressful), or quickly searching online for a name or idea, which pulls them out of the moment.
        

**User Pain Points:**

-   "The preparation time for my weekly game is longer than the game session itself. It feels like a second job."
    
-   "My players decided to visit a town I hadn't even named yet, and I had to make up everything on the spot. It felt flimsy and obvious."
    
-   "I feel like all my tavern keepers are just variations of the same grumpy dwarf. I'm running out of fresh ideas."
    
-   "I have 15 different browser tabs open just to plan one encounter—one for my notes, one for a name generator, one for monster stats, and another for inspirational art."
    

----------


### Secondary Users (Optional)

-   **The Players:** While they will never interact with **ATLAS** directly, the players are the ultimate beneficiaries of the tool. A DM who uses **ATLAS** is better prepared, more confident, and can deliver a more dynamic, immersive, and visually rich world, leading to a better gameplay experience for everyone at the table.
    
-   **TTRPG Content Creators:** Authors and artists who create and sell their own adventures, supplements, or art packs on platforms like DMs Guild could use **ATLAS** to accelerate their creative workflow, from brainstorming initial concepts to generating flavor text and character art.


----------


## 3. Success Criteria

### Product Success Metrics

**How we'll know our solution works and is valuable to DMs:**

1.  **Metric #1: Quality of Generation**
    
    -   **Target:** ≥80% of generated content (NPCs, locations, plot hooks) is rated as "useful" or "very useful" (4 or 5 on a 5-point scale) by test users.
        
    -   **Measurement Method:** A simple feedback mechanism (e.g., thumbs up/down or a star rating) integrated into the UI for each generated piece of content, and post-session surveys with our user testers.
        
2.  **Metric #2: Reduction in Preparation Time (Efficiency)**
    
    -   **Target:** Users report a perceived reduction in session preparation time of at least 25% compared to their usual methods.
        
    -   **Measurement Method:** Qualitative feedback from user interviews and post-session surveys. We'll ask: "Compared to your normal prep, how much faster did using ATLAS feel for creating [an NPC/a location]?"
        
3.  **Metric #3: User Engagement & Adoption**
    
    -   **Target:** During a 30-minute test session, a user voluntarily engages in at least 10 back-and-forth conversational turns with the AI assistant.
        
    -   **Measurement Method:** Analytics tracking the number of messages sent per user session during our user studies.
        
4.  **Metric #4: Improvisational Utility**
    
    -   **Target:** In a simulated "live-play" scenario, DMs can generate a plausible response to an unexpected player action in under 30 seconds using ATLAS.
        
    -   **Measurement Method:** Timed tasks during our user testing sessions. (e.g., "The players just set fire to the tavern. Use ATLAS to figure out what happens next. Go!").
        
5.  **Metric #5: Cost Efficiency**
    
    -   **Target:** The average API cost for a standard 30-minute creative session (defined as ~15 conversational turns and 2-3 image generations) remains under **$0.50**.
        
    -   **Measurement Method:** Implement logging on the backend to track token usage (prompt and completion) and the number of images generated per session. Calculate the total cost after each user test using the public pricing of the chosen AI models.

        

----------


### Technical Success Criteria

**Minimum viable performance for the application:**

-   **Text Response Latency:** The p95 (95th percentile) time from user message submission to the first token of the AI's response appearing should be **< 3 seconds**.
    
-   **Image Generation Latency:** The time to generate and display a requested image should be **< 15 seconds** on average.
    
-   **Availability / Uptime:** The application should maintain >98% availability during our designated user testing periods.
    
-   **Error Rate:** Less than 2% of user requests to the backend should result in a critical failure (e.g., a 500 error).

----------


### Learning Goals

**What each team member wants to learn:**

**Ioane Chanturia/Nikoloz Tepnadze -  Backend/AI:**

-   How to effectively engineer and chain prompts for complex, multi-turn creative tasks using a modern LLM API (e.g., OpenAI).
    
-   Implementing a robust backend service using Python and FastAPI to handle real-time AI interactions.
    

**Davit Datunashvili -  Frontend:**

-   Building a dynamic, responsive chat interface with a modern framework like React, including handling streaming text responses.
    
-   Managing complex UI state and asynchronous API calls to create a seamless user experience.
    

**Davit Datunashvili -  AI/Visuals:**

-   Integrating and optimizing prompts for a generative image API (e.g., DALL-E 3, Stability AI) to produce stylistically consistent results.
    
-   Developing a system to translate narrative context from a conversation into effective prompts for a visual model.
----------

## 4. Technical Architecture


### System Overview

ATLAS is designed as a modern client-server web application. The system consists of a dynamic frontend built with React, which serves as the user's chat interface. All user interactions are sent to a Python backend powered by the FastAPI framework. This backend acts as the central orchestrator, managing the conversational context and making intelligent calls to third-party AI services.

When a user sends a message, the backend appends it to the session's conversation history and forwards the entire context to an OpenAI Large Language Model (GPT-4o) to generate a narrative response. If the user's prompt indicates a request for an image, the backend will use the LLM to synthesize the relevant context into a detailed visual prompt, then call an image generation API (DALL-E 3) to create the visual asset. The final response, containing text and/or an image URL, is streamed back to the frontend to provide a responsive user experience.

----------

### Architecture Diagram

[](https://github.com/ZA-KIU/AI-POWERED-SOFTWARE-DEV/blob/main/course-pack/labs/lab-2/templates/capstone-proposal-template.md#architecture-diagram)

```
┌─────────────┐      ┌────────────────┐      ┌──────────────────┐
│ User's      ├─────▶│ Frontend       ├─────▶│ Backend Server   │
│ Browser     │◀─────│ (React/Vite)   │◀─────│ (Python/FastAPI) │
└─────────────┘      └────────────────┘      └──────────────────┘
                                                       │
                                          ┌────────────┼─────────────┐
                                          ▼            ▼             ▼
                                   ┌───────────┐  ┌───────────┐  ┌───────────┐
                                   │ OpenAI    │  │ DALL-E 3  │  │ [Future]  │
                                   │ GPT-4o    │  │  (Image)  │  │ Vector DB │
                                   │ (Text)    │  └───────────┘  └───────────┘
                                   │           │
                                   │           │
                                   └───────────┘

```


----------


### Technology Stack

**Frontend:**

-   **Framework:**  **React (with Vite)** for a fast, modern development experience.
    
-   **Key Libraries:**  **TailwindCSS** for styling, **React-Markdown** to render formatted AI responses, **TanStack Query** for managing server state.
    
-   **Hosting:**  **Vercel** or **Netlify** for seamless CI/CD and hosting.
    

**Backend:**

-   **Framework:**  **FastAPI** for its high performance and asynchronous capabilities, which are ideal for handling streaming AI responses.
    
-   **Language:**  **Python 3.11+**
    
-   **Hosting:**  **Render** or **Railway** for easy deployment of Python web services.
    

**AI/ML Services:**

-   **Primary Text Model:**  **OpenAI GPT-4o** for its strong balance of intelligence, speed, and cost.
    
-   **Primary Image Model:**  **OpenAI DALL-E 3** for its excellent prompt adherence and integration within the OpenAI ecosystem.
    
-   **Alternative Image Model:**  **Stability AI (Stable Diffusion 3)** as a potential alternative for stylistic control and cost-effectiveness.
    

**Data Storage:**

-   **None for this scope.** All conversational memory will be managed in-memory on the backend for the duration of a user's session and passed with each API call. This aligns with our goal of avoiding database complexity.
    

**DevOps/Tooling:**

-   **Version Control:**  **GitHub**
    
-   **CI/CD:**  **GitHub Actions** for running tests and automating deployments.
    
-   **Testing:**  **Pytest** for the backend, **Vitest** or **Jest** for the frontend.

----------

### Data Flow




**Example Flow: User asks for an NPC image.**

1.  **Context History:** The chat already contains the description of "Kaelen, a grumpy dwarven blacksmith with a braided red beard."
    
2.  **User Input:** User types "Show me what Kaelen looks like" into the React frontend.
    
3.  **Frontend Request:** The frontend sends a POST request to the /api/chat endpoint. The request body contains the entire chat history, including the new user message.
    
4.  **Backend Orchestration (FastAPI):**
    
    -   The backend receives the request. It analyzes the latest message for image generation intent.
        
    -   It constructs a new prompt for the LLM to synthesize the conversational context into a visual description.
        
    -   It calls the GPT-4o API for this synthesis task.
        
    -   GPT-4o returns a refined, detailed image prompt.
        
    -   The backend calls the DALL-E 3 API with this optimized prompt.
        
    -   The API returns an image URL.
        
    -   The backend constructs a final JSON response and streams it back to the client.
        
5.  **Frontend Display:** The React frontend receives the JSON, displays the text message, and renders the image from the provided URL.
    

**Critical Path Latency Budget (Target for p95):**

-   **User Input → First Text Token:** This is for standard conversational turns.
    
    -   Network (Client to Backend): < 200ms
        
    -   Backend Processing (Pre-API call): < 100ms
        
    -   LLM Time to First Token (TTFT): < 1500ms
        
    -   Network (Backend to Client): < 200ms
        
    -   **Total Target (Text): < 2 seconds**
        
-   **User Input → Image Display:** This is for image generation requests.
    
    -   Network & Backend (as above): < 300ms
        
    -   LLM Prompt Synthesis: < 2000ms
        
    -   Image Model Generation Time: < 10000ms
        
    -   Network (Backend to Client): < 500ms
        
    -   **Total Target (Image): < 13 seconds**

----------


### AI Integration Details

**Model Selection:**

-   **Text Generation:** We chose **GPT-4o** for its high reasoning and creative writing capabilities, crucial for maintaining a coherent narrative. Its speed and lower cost compared to older GPT-4 models make it ideal for a conversational application.
    
-   **Image Generation:** We chose **DALL-E 3** because its native integration with the OpenAI ecosystem simplifies development, and it excels at interpreting complex, descriptive prompts generated by the text LLM.
    

**Prompt Strategy:**


-   **System Prompt:** Every conversation will begin with a carefully crafted system prompt that defines the AI's persona as ATLAS, its purpose, its capabilities, and its limitations.
    
-   **Temperature:** We will use a higher temperature (e.g., 0.8) for creative tasks like brainstorming and a lower temperature (e.g., 0.4) for summarization or synthesis tasks.
**Example Prompt:**

```
You are ATLAS, a creative, collaborative AI assistant for Dungeon Masters. Your purpose is to help DMs brainstorm and generate content for their tabletop role-playing games. You are an expert in fantasy worlds, character development, and storytelling.

Your capabilities include:
- Creating detailed Non-Player Characters (NPCs) with personalities, motivations, and backstories.
- Describing evocative locations, from bustling cities to dangerous dungeons.
- Brainstorming compelling plot hooks and adventure ideas.
- Assisting with improvisation when players do something unexpected.

Your rules:
- Always be helpful and creative.
- When asked for a visual, generate a rich description suitable for an image model.
- Never provide game mechanics, stats, or specific rules from systems like D&D. Focus purely on the narrative.

```

**Retrieval Strategy (if applicable):**

-   **Method:** We will use a "Sliding Window" approach for context management. The entire conversation history (user and assistant messages) will be sent with each API call.
    
-   **Context Length:** The primary context window will be the last k messages (e.g., k=20). This ensures recent context is always preserved.
    
-   **Truncation:** If the total token count of the history exceeds the model's limit (e.g., 8000 tokens), we will systematically remove the oldest messages (after the initial system prompt) until the context fits. This prevents API errors while maintaining the most relevant recent conversation.
    
-   **Future Work (RAG):** For the "Run" phase of the project, this simple session memory would be replaced with a true Retrieval-Augmented Generation (RAG) system where a DM's entire campaign notes are stored in a vector database for long-term, semantic retrieval.

----------

### Third-Party Services & APIs


<table>
  <thead>
    <tr>
      <th>Service</th>
      <th>Purpose</th>
      <th>Estimated Cost</th>
      <th>Rate Limits (Typical Tier 1)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>OpenAI API</b></td>
      <td>Text Generation (GPT-4o)</td>
      <td>~$5.00 / 1M input tokens</td>
      <td>600K Tokens/Min</td>
    </tr>
    <tr>
      <td><b>OpenAI API</b></td>
      <td>Image Generation (DALL-E 3)</td>
      <td>$0.04 / standard image</td>
      <td>5 images/min</td>
    </tr>
    <tr>
      <td><b>Stability AI</b></td>
      <td>(Alternative) Image Generation</td>
      <td>~$0.02 / standard image</td>
      <td>Varies by plan</td>
    </tr>
  </tbody>
</table>


**API Keys & Secrets:**

-   All API keys and secrets will be stored in local .env files and will not be committed to the GitHub repository.
    
-   The repository will contain a .env.example file to provide a template for team members.
    
-   Production keys will be managed as environment variables in our hosting service (e.g., Vercel, Render).

----------


## 5. Risk Assessment

### Technical Risks

**Risk #1: High API Latency**

-   **Likelihood:** High
    
-   **Impact:** Medium (A slow, laggy chat experience frustrates users and breaks the creative flow.)
    
-   **Mitigation:**
    
    1.  **Use Streaming:** We will stream text responses from the API to the frontend. This shows the AI is "typing" and provides a much better perceived performance than waiting for the full response.
        
    2.  **Optimized Models:** We have selected GPT-4o specifically for its balance of speed and quality. We will monitor its performance and can fall back to an even faster model (like GPT-3.5-Turbo) if necessary.
        
    3.  **UI Feedback:** The frontend will display clear loading indicators for both text and image generation so the user is never left wondering if the app is working.
        

**Risk #2: Inconsistent or Low-Quality AI Output**

-   **Likelihood:** Medium
    
-   **Impact:** High (If the AI generates generic, nonsensical, or repetitive content, the core value of the tool is lost.)
    
-   **Mitigation:**
    
    1.  **Iterative Prompt Engineering:** A significant portion of our development time is allocated to refining our system prompts and the specific prompts used for tasks like image generation.
        
    2.  **User Feedback Loop:** We will incorporate a simple "thumbs up/down" on generations. This data will help us identify which types of prompts are failing.
        
    3.  **"Regenerate" Feature:** We will include a button that allows the user to easily request a new response if the first one is unsatisfactory.
        

**Risk #3: Exceeding API Rate Limits or Budget**

-   **Likelihood:** Medium
    
-   **Impact:** Medium (Hitting a rate limit can temporarily disable the app, while exceeding the budget is a project constraint.)
    
-   **Mitigation:**
    
    1.  **Cost Tracking:** We will build logging into our backend to track token usage and image generation counts for every session.
        
    2.  **Usage Monitoring:** We will set up alerts on our OpenAI account to notify us when we approach our budget limits.
        
    3.  **Efficient Prompting:** We will design our prompts to be as concise as possible while still being effective to minimize token usage.
----------

### Product Risks


**Risk #1: Users Don't Find the Conversational Flow Natural**

-   **Likelihood:** Medium
    
-   **Impact:** High (If the tool feels more cumbersome than a user's existing workflow, it won't be adopted.)
    
-   **Mitigation:**
    
    1.  **Early Prototyping & User Testing:** We will conduct our first round of user testing early (Week 7) with a focus on the core conversational experience to gather qualitative feedback.
        
    2.  **Observe, Don't Just Ask:** During user tests, we will observe users' natural interaction patterns to identify points of friction, rather than just asking if they like it.
        

**Risk #2: Scope Creep**

-   **Likelihood:** High
    
-   **Impact:** High (Adding "just one more feature" repeatedly can derail the project and lead to an unfinished product.)
    
-   **Mitigation:**
    
    1.  **Adherence to "Walk" Phase:** We will be disciplined about sticking to our defined "Walk" scope. Any new ideas will be documented and explicitly deferred to the "Run" or "Fly" phases.
        
    2.  **Weekly Scope Review:** Our weekly team meetings will include a brief review of our current tasks against the defined scope to ensure we are not drifting.
----------

### Team Risks


**Risk #1: Uneven Workload Distribution**

-   **Likelihood:** Medium
    
-   **Impact:** Medium (Can lead to burnout for one member and disengagement for others, hurting team morale and progress.)
    
-   **Mitigation:**
    
    1.  **Clear Role Definition:** While we will all collaborate, we will assign primary ownership for key components (e.g., Member 1 on Backend/AI, Member 2 on Frontend, Member 3 on Visual AI/Prompts).
        
    2.  **Weekly Task Review:** We will use a shared task board (e.g., GitHub Projects, Trello) and review it during our weekly stand-ups to ensure work is balanced and transparent.
        

**Risk #2: Technical Skill Gaps**

-   **Likelihood:** High (As this is a learning project, it's expected that we will encounter technologies we are not experts in.)
    
-   **Impact:** Medium (Can cause delays if a team member gets stuck on a critical path task.)
    
-   **Mitigation:**
    
    1.  **Encourage Collaboration:** We will foster a "no stupid questions" environment and encourage pair programming or brainstorming sessions to solve difficult problems together.
        
    2.  **Time for Research:** Our project timeline (Section 8) explicitly allocates time for research and learning (e.g., Week 3 for streaming, Week 5 for image prompting).
        
    3.  **Cross-Training:** The primary owner of a component will be responsible for documenting their work so that another team member can understand it if needed.
        

**Risk #3: Disagreements on Product Direction or Features**

-   **Likelihood:** Medium
    
-   **Impact:** Medium (Can lead to wasted time and team friction if not resolved quickly.)
    
-   **Mitigation:**
    
    1.  **Reference the Proposal:** This document will serve as our "source of truth." When in doubt about a feature, we will refer back to the agreed-upon scope.
        
    2.  **Designated Tie-Breaker/Process:** We will establish a clear decision-making process in our team contract. For example, a "disagree and commit" principle, or designating a rotating "product lead" for each week.
----------

### Safety & Ethical Risks


**Risk #1: Generation of Harmful or Biased Content**

-   **Likelihood:** Medium
    
-   **Impact:** High (The AI could generate content that reinforces harmful stereotypes or is otherwise inappropriate.)
    
-   **Mitigation:**
    
    1.  **Leverage Provider Safeguards:** We are using established, moderated APIs from OpenAI, which have their own built-in safety filters.
        
    2.  **System Prompt Guardrails:** Our system prompt will include explicit instructions to avoid inappropriate themes and to create diverse and respectful content.
        
    3.  **Disclaimer:** The UI will include a clear disclaimer that the content is AI-generated and may occasionally be unpredictable or inaccurate.
        

**Risk #2: Prompt Injection Attacks**

-   **Likelihood:** Low (For our use case, the impact is low, but it's good practice to consider.)
    
-   **Impact:** Low (An attacker could make the AI break character, which would be a poor user experience but not a security threat.)
    
-   **Mitigation:**
    
    1.  **Input Sanitization:** We will perform basic sanitization on user inputs.
        
    2.  **Prompt Structure:** We will clearly delineate between our system instructions and user-provided content in the prompts we send to the API.

----------

### Contingency Plans


-   **If our primary AI models are unavailable or too expensive:** We will switch to a lower-cost alternative like GPT-3.5-Turbo for text and a different image provider like Stability AI. We will notify the user of a potential degradation in quality.
    
-   **If we fall significantly behind schedule:** We will de-scope by temporarily removing the image generation feature and focusing exclusively on perfecting the core text-based conversational experience.
    
-   **If we cannot recruit enough user testers:** We will conduct internal "dogfooding" sessions where team members act as users, and supplement this with a synthetic evaluation using a pre-written set of challenging DM prompts.
----------


## 6. Research Plan

### What We Need to Learn

**Technical Questions:**

1.  **Question:** What is the most effective prompt engineering strategy to maintain a consistent AI persona ("ATLAS") and ensure high-quality, creative output across different tasks (NPCs, locations, plots)?
    
    -   **Resources:** OpenAI's Prompt Engineering Guide, online prompt-crafting communities, LangChain documentation for prompt templating.
        
    -   **Timeline:** Weeks 3-5 (Ongoing).
        
2.  **Question:** How can we reliably translate the abstract context of a chat conversation into a concrete, effective prompt for DALL-E 3 to ensure stylistic consistency in generated images?
    
    -   **Resources:** DALL-E 3 API documentation, articles on "art direction" for AI image models, experimentation in the OpenAI Playground.
        
    -   **Timeline:** Weeks 5-6.
        
3.  **Question:** What is the optimal implementation for streaming text responses from a FastAPI backend to a React frontend to maximize perceived performance?
    
    -   **Resources:** FastAPI documentation on StreamingResponse, tutorials on using the fetch API with streaming in JavaScript.
        
    -   **Timeline:** Weeks 3-4.
        

**Product Questions:**

1.  **Question:** Do Dungeon Masters prefer the AI to be more proactive and suggestive, or more passive and obedient? (e.g., should it offer unsolicited ideas?)
    
    -   **Method:** A/B testing two different system prompts during user testing sessions.
        
    -   **Timeline:** Week 7-8.
        
2.  **Question:** What is the most intuitive UI for a DM to manage both a conversation and the generated assets (text snippets, images)?
    
    -   **Method:** Observe user behavior during our testing protocol. Pay close attention to how they save or copy content.
        
    -   **Timeline:** Week 7-8.
        

----------

### Experiments & Prototypes

**Weeks 3-4: Core Chat Proof-of-Concept (PoC)**

-   **Goal:** Establish the fundamental end-to-end flow: a user message from a basic React UI is sent to the FastAPI backend, which calls the GPT-4o API and streams the response back.
    
-   **Success Criteria:** A simple "hello world" style chat is functional. Latency for the first token is under 3 seconds.
    
-   **What We'll Learn:** The basics of API integration, handling API keys securely, and the mechanics of streaming responses.
    

**Weeks 5-6: Image Generation Integration**

-   **Goal:** Implement the logic for triggering image generation from the conversation and displaying the result in the chat.
    
-   **Success Criteria:** A user can type "Show me a dragon" and an image of a dragon appears in the chat UI.
    
-   **What We'll Learn:** The two-step process of using an LLM to generate an image prompt, calling the image API, and handling the asynchronous nature of image generation.
    

**Weeks 7-8: User Testing Round 1 & Iteration**

-   **Goal:** Get the first round of qualitative feedback from real Dungeon Masters on the core functionality.
    
-   **Success Criteria:** Complete at least 3-5 user test sessions. Identify the top 3-5 usability pain points or areas for improvement.
    
-   **What We'll Learn:** How our target users actually interact with the tool, the quality of our initial prompts, and the most requested features.
    

**Weeks 10-11: Prompt & Performance Optimization**

-   **Goal:** Refine our system prompts based on user feedback and optimize the application's performance and cost.
    
-   **Success Criteria:** Reduce average cost-per-session to meet our success metric (<$0.50) and ensure text/image latency targets are met.
    
-   **What We'll Learn:** Advanced prompt engineering techniques, cost-saving strategies (e.g., model choice, prompt length), and backend performance tuning.
    

----------

### Literature & Resources

**Key Articles/Guides to Review:**

-   **OpenAI Prompt Engineering Guide:** The foundational resource for crafting effective prompts.
    
-   **OWASP Top 10 for Large Language Model Applications:** To understand potential security vulnerabilities like prompt injection.
    
-   **"A DM's Guide to AI" (Online Blogs/Articles):** Review existing community discussions on how DMs are currently using AI to inform our feature set.
    

**Tutorials/Examples to Follow:**

-   **FastAPI Documentation on StreamingResponse:** Official guide for our core backend streaming implementation.
    
-   **OpenAI Cookbook on GitHub:** Contains practical examples for API usage, including function calling and context management.
    
-   **Vercel's Starter Templates for React + FastAPI:** A potential starting point for our project structure and deployment pipeline.
----------


## 7. User Study Plan

### Research Ethics

**IRB Approval:**

-   For the scope of this course project, we do not believe full IRB (Institutional Review Board) approval is necessary. We will be collecting non-sensitive, product-focused feedback from adult volunteers. We will complete any required university "IRB Light" checklist to confirm this.
    

**Data We'll Collect:**

-   **Qualitative:** Observer notes on user behavior, direct quotes, and thematic feedback from post-session interviews.
    
-   **Quantitative:** Task completion times for specific scenarios, user satisfaction ratings (1-5 scale), and simple UI interaction counts (e.g., number of "regenerate" clicks).
    
-   All data will be anonymized in our final report. Raw notes will be stored securely and deleted at the end of the semester.
    

**User Consent:**

-   We will use a consent form (adapted from the course template) at the beginning of each session.
    
-   We will clearly explain the purpose of the study, the type of data being collected, and that their participation is voluntary.
    
-   Participants will be informed that they can end the session at any time for any reason.

----------

### Recruitment Plan


**Target Participants:**

-   **Number:** We aim to get feedback from **3-5 users**.
    
-   **Criteria:** Participants should have some familiarity with TTRPGs like Dungeons & Dragons. They can be players or aspiring DMs; direct experience as a DM is a bonus, but not a strict requirement for providing useful feedback.
    
-   **Where we'll find them:** We will recruit from our circle of friends, classmates, and members of university clubs (e.g., gaming clubs, computer science societies) who have an interest in the hobby.
    

**Compensation:**

-   There will be **no monetary compensation**, as this is a university project and participation is on a volunteer basis. We will express our sincere gratitude and acknowledge their contribution in our final project presentation.
    

**Timeline:**

-   **Week 9:** Finalize our testing script and identify potential volunteers.
    
-   **Week 10-11:** Conduct the informal user feedback sessions.
    
-   **Week 12:** Analyze feedback and create a prioritized list of improvements.

----------

### Testing Protocol


**Session Structure (30 minutes, informal, in-person or remote):**

1.  **Introduction & Goal (5 min)**
    
    -   Welcome and thanks for helping out.
        
    -   Explain the project: "We're building an AI tool called ATLAS to help Dungeon Masters come up with creative ideas for their games. We'd love to get your thoughts on it."
        
    -   Explain "think-aloud": "As you try it out, just talk through what you're thinking, what you're trying to do, and what you find confusing or cool."
        
2.  **Guided Exploration (15 min)**
    
    -   Instead of strict tasks, we will provide a few starting prompts and let the user explore freely.
        
    -   **Prompt 1 (NPC):** "Try asking ATLAS to create a fun character for a fantasy story. Maybe a clumsy wizard or a sneaky rogue. See if you can get it to generate a picture of them."
        
    -   **Prompt 2 (Location):** "Now, try asking it to describe a cool place, like a hidden cave behind a waterfall or a spooky, abandoned library."
        
    -   **Prompt 3 (Improvisation):** "Let's try a weird one. Ask it what would happen if a group of heroes tried to start a goblin rock band."
        
    -   **Observe:** What do they type first? Do they understand how to interact with it? Are they engaged? Where do they get stuck?
        
3.  **Post-Session Chat & Feedback (10 min)**
    
    -   "What did you think? Was that fun to use?"
        
    -   "What was the coolest thing it did?"
        
    -   "Was there anything that was confusing or didn't work how you expected?"
        
    -   "If you were a DM, could you see yourself using something like this? What would you use it for?"
        
    -   Thank them for their time and valuable feedback.

----------


### Data Collection & Analysis

**Data Collection Methods:**

-   Live observer notes taken during the session.
    
-   Video and screen recordings of the sessions (with explicit user consent).
    
-   Post-session survey to capture quantitative ratings.
    
-   Backend logs to track API costs and latencies per session.
    

**Analysis Plan:**

-   After the sessions, the team will meet to review the notes and recordings.
    
-   We will use a simple thematic analysis to identify common patterns, key pain points, and strong positive feedback.
    
-   We will create a "findings" summary, prioritizing the most critical issues to fix and the most promising ideas to explore, which will directly inform the next phase of our development.
----------


## 8. Project Timeline & Milestones

### Weekly Breakdown

Week

Focus

Key Deliverables & Goals

Owner(s)


### Weekly Breakdown

| Week | Focus | Key Deliverables & Goals | Owner(s) |
| :--- | :--- | :--- | :--- |
| **1** | **Planning & Setup** | Project ideation, team formation, finalize project name (ATLAS). Set up GitHub repo and local dev environments. | All |
| **2** | **Proposal & Design** | **Write and submit this Capstone Proposal.** Draft initial UI mockups and finalize the technical architecture. | All |
| **3** | **Core Backend** | Implement the basic FastAPI server. Create the endpoint for chat and integrate the OpenAI API for text generation (GPT-4o). | Backend/AI |
| **4** | **Core Frontend** | Build the basic React chat interface. Implement state management for messages. Connect frontend to the backend to send a message and receive a simple text response. | Frontend |
| **5** | **Streaming & Prompts**| Implement streaming responses from the backend to the frontend. Begin Version 1 of the ATLAS system prompt. | Backend/AI |
| **6** | **Image Generation** | Implement the full image generation logic: context synthesis via LLM and calling the DALL-E 3 API. Display images in the UI. | AI/Visuals |
| **7** | **User Study Prep** | Refine the UI/UX based on internal testing. Prepare the user study protocol and recruit 3-5 volunteer testers. | All |
| **8** | **User Feedback** | **Conduct user feedback sessions.** Synthesize notes and identify the top 3-5 priorities for improvement. | All |
| **9** | **Iteration** | Implement the most critical changes based on user feedback. Focus on improving prompt quality and fixing usability issues. | All |
| **10** | **Optimization** | Focus on performance and cost. Implement token counting/truncation. Refine safety guardrails in the system prompt. | Backend/AI |
| **11** | **Final Polish** | Finalize all UI elements. Conduct thorough internal testing and bug fixing. Prepare for the final demo. | Frontend |
| **12** | **Documentation**| Write the final project documentation (README, case study). Record the demo video and prepare the presentation slides. | All |
| **13** | **Final Demo** | **Deliver final presentation and demo.** Submit all project deliverables. | All |
----------

### Major Milestones

**✅ Milestone 1: Project Proposal (Due Week 2)**

-   A comprehensive plan outlining the project's vision, scope, technical architecture, and timeline.
    

**🎯 Milestone 2: Core Functionality Prototype (Target: End of Week 6)**

-   A working web application where a user can have a text-based conversation with the AI and successfully generate both text and image content.
    

**🎯 Milestone 3: User Feedback Incorporation (Target: End of Week 9)**

-   The application has been updated to address the most critical feedback gathered from user testing sessions, demonstrating a cycle of building, testing, and iterating.
    

**🎯 Milestone 4: Final Product Demo & Submission (Due Week 13)**

-   A polished, functional, and well-documented application. The final submission includes a presentation, a demo video, and the complete codebase.
    

----------

### Backup Plan

**If we fall behind schedule, we will cut scope in the following order:**

1.  **Cut First:**  **Image Generation.** This is the most complex secondary feature. We would revert to a text-only assistant, which still delivers on the core promise of the tool.
    
2.  **Cut Second:**  **Advanced Prompting Strategies.** We would simplify our prompts and rely on a single, robust system prompt rather than implementing more complex logic for different tasks.
    
3.  **Cut Third:**  **UI Polish.** We would focus on a functional, "good-enough" UI rather than spending extra time on animations, advanced styling, or complex layout.
    

**Core features we will not cut:**

-   The web-based chat interface.
    
-   The core conversational loop with the text generation AI.
    
-   Session-based memory (sending chat history with requests).
    



----------

## 9. Budget & Resources

We need more time to discuss budget restraints and resource management for project.

----------

## 10. Appendix

### Team Contract Summary


Our team contract is a foundational agreement that sets clear expectations for communication, roles, and responsibilities to ensure we collaborate effectively and respectfully. See [docs/team-contract.md](https://github.com/thecooked1/cs-ai-2025-team-tequila-sunset/blob/48ac307c846423ce8bef42a9601c00d5791f9767/docs/team-contract.md) for full details.


----------

### Revision History

[Empty For Now]

Final review and approval

----------


