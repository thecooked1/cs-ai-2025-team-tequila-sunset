### **AI-Generated Feature Roadmap**

**Project Name:** ATLAS: A Conversational AI Assistant for Dungeon Masters  
**Team Members:** Ioane Chanturia, Davit Datunashvili, Nikoloz Tepnadze  
**Date:** Week 4, 31/10/2025  
**Generated Using:** 20-Pillar Design System + Feature Prioritization Framework

----------

### 📋 Executive Summary

**Total Features Explored:** 30+ features across 5 strategic pillars  
**MVP Features Selected:** 5 core features for the Week 13 demo  
**Future Roadmap:** 25+ features for post-course development

**Key Insight:**

> Our AI-driven exploration revealed that the highest value for a Dungeon Master lies not in generating a massive volume of content, but in providing high-quality, context-aware suggestions fluidly within a single, uninterrupted conversation. This solidified our decision to focus on a conversational UX over a "dashboard of generators."

----------

### 🎯 Selected Design Pillars

#### Overview

From the 20-Pillar Design System, we selected the following pillars as most relevant to our project:
| # | Design Pillar | Why Selected | Priority |
|---|---|---|---|
| 1 | **Creative Spark Engine** | This is the core of ATLAS—its ability to generate novel ideas for NPCs, locations, and plots. | High |
| 2 | **Conversational Fluidity** | The user experience lives or dies by the quality of the back-and-forth interaction with the AI. | High |
| 3 | **Improvisation & Live Play** | The tool must be fast and effective enough to be used during a live game session, not just for prep. | Medium |
| 4 | **Content Management & Export**| Generated content is useless if the DM can't easily save and use it in their own tools. | Medium |
| 5 | **Trust & Reliability** | The DM must trust the AI to be a reliable partner, which includes handling errors and limitations gracefully. | High |
  

**Pillars We Considered But Rejected:**

-   **Monetization & Subscription:** Rejected because it's irrelevant for initial stage of an university project's MVP.
    
-   **Community & Sharing:** Rejected because it adds significant social/data complexity.
    
-   **Advanced Game Mechanics:** Rejected because our goal is narrative assistance, not rule simulation, which would dramatically increase complexity.


### 🔧 Complete Feature Matrix

#### Pillar 1: Creative Spark Engine

**Strategic Focus:** Generating high-quality, foundational TTRPG content on demand.

| # | Feature | Description | Priority | Effort | Value | Status |
|---|---|---|---|---|---|---|
| 1.1 | **Core NPC Generation** | Generate a character with a name, appearance, and personality. | P1 | M | High | MVP |
| 1.2 | **Core Location Generation**| Generate a description of a fantasy location. | P1 | M | High | MVP |
| 1.3 | **Core Plot Hook Generation**| Generate a starting quest or adventure idea. | P1 | M | High | MVP |
| 1.4 | **NPC Image Generation** | Generate a visual portrait for a generated NPC. | P1 | L | High | MVP |
| 1.5 | **Magic Item Generation** | Create a unique magical item with a history and abilities. | P2 | S | Med | Future |
| 1.6 | **Dungeon Layout Ideas** | Generate high-level ideas for a dungeon's rooms and themes. | P3 | M | Med | Future |
| 1.7 | **Follow-up Questions** | Allow the user to ask for more details on a generated item. | P1 | M | High | MVP |
| 1.8 | **Location Image Generation**| Generate an atmospheric image for a described location. | P2 | L | High | Future |
| 1.9 | **Monster Creator** | Design a new, unique monster, not just a description of an existing one. | P3 | L | Med | Future |
| 1.10| **City/Town Generator** | Generate a whole town with key locations, NPCs, and a local conflict. | P3 | L | High | Cut |
  

**Key Decisions for Pillar 1:**

-   **What we're building:** We are focusing on the fundamental building blocks for a DM: **NPCs, Locations, and Plot Hooks**, along with the ability to **generate images for NPCs** and ask **follow-up questions**. These five features form the core creative loop.
    
-   **What we're deferring:** Generating more complex or niche content like **Magic Items**, **Dungeon Ideas**, and **Location Images** are excellent "Run" phase features.
    
-   **What we're cutting:** A full **Town Generator** is too complex and high-effort for the MVP, and its functionality can be achieved by combining the other generators.
    

----------

#### Pillar 2: Conversational Fluidity

**Strategic Focus:** Ensuring the chat experience is seamless, responsive, and intelligent.

| # | Feature | Description | Priority | Effort | Value | Status |
|---|---|---|---|---|---|---|
| 2.1 | **Core Chat Interface** | A functional UI to send and receive messages. | P1 | M | High | MVP |
| 2.2 | **Streaming Text Responses**| AI responses appear word-by-word, like a real-time message. | P2 | M | High | Should Have |
| 2.3 | **Session-based Memory** | The AI remembers the context of the current conversation. | P1 | M | High | MVP |
| 2.4 | **Markdown Rendering** | Render bold, italics, and lists from the AI's response as HTML. | P3 | S | Low | Nice to Have |
| 2.5 | **Persistent Memory** | The AI remembers conversations across different browser sessions. | P3 | L | High | Cut |
| 2.6 | **Suggested Follow-ups** | The AI suggests 2-3 relevant follow-up questions for the user. | P3 | M | Med | Future |
| 2.7 | **"Clear Conversation" Button**| A button to easily reset the conversation state and start over. | P2 | S | Med | Should Have |
  

**Key Decisions for Pillar 2:**

-   **What we're building:** The non-negotiable elements are the **Core Chat Interface** and **Session-based Memory**. Without these, the app doesn't work.
    
-   **What we're deferring:**  **Streaming Responses** and a **Clear Conversation** button are high-value user experience improvements that we'll implement if the core features are completed ahead of schedule.
    
-   **What we're cutting:**  **Persistent Memory** (saving chats) is a "Run" phase feature that requires a database and user accounts, so it is explicitly cut from the MVP.

#### Pillar 3: Improvisation & Live Play

**Strategic Focus:** The tool must be fast and effective enough to be used during a live game session, not just for prep.
| # | Feature | Description | Priority | Effort | Value | Status |
|---|---|---|---|---|---|---|
| 3.1 | **Core Improvisation Aid** | Get quick ideas for unexpected player actions. | P1 | M | High | MVP |
| 3.2 | **Quick Name Generator** | Ask for a quick name for a person, place, or thing. | P2 | S | Med | Should Have |
| 3.3 | **Mobile/Tablet UI** | Ensure the interface is usable on smaller screens DMs use at the table. | P3 | M | Med | Future |
| 3.4 | **Low Latency Mode** | A toggle to use a faster (but less creative) AI model for urgent needs. | P3 | M | Med | Future |
| 3.5 | **"Panic Button" Encounter**| A single button to generate a full, simple encounter on the spot. | P3 | L | High | Future |`
  

**Key Decisions for Pillar 3:**

-   **What we're building:** The **Core Improvisation Aid** is the only P1 feature here. It directly tests the hypothesis that ATLAS can be a live-play tool.
    
-   **What we're deferring:** The **Quick Name Generator** is a fantastic "Should Have" feature because it's a very common real-world need. The other features are excellent for a "Run" phase focused on optimizing the live-play experience.
    

----------

#### Pillar 4: Content Management & Export

**Strategic Focus:** Generated content is useless if the DM can't easily save and use it in their own tools.

| # | Feature | Description | Priority | Effort | Value | Status |
|---|---|---|---|---|---|---|
| 4.1 | **Copy Text Button** | A simple button on each AI message to copy its content to the clipboard. | P2 | S | High | Should Have |
| 4.2 | **Download Image Button** | A button to download a generated image as a PNG/JPG file. | P2 | S | High | Should Have |
| 4.3 | **Export Conversation** | Export the entire chat history as a formatted Markdown or text file. | P3 | M | Med | Future |
| 4.4 | **"Save to Library"** | An in-app library to save and organize favorite generated items. | P3 | L | High | Cut |
| 4.5 | **VTT Integration** | Directly send content and images to a Virtual Tabletop like Roll20. | P3 | L | High | Cut |`
  

**Key Decisions for Pillar 4:**

-   **What we're building:** We have no P1 features here, but **Copy Text** and **Download Image** are high-priority P2s. They are low-effort, high-value features that make the tool significantly more useful.
    
-   **What we're cutting:** Any feature requiring persistent storage, like a **Library** or **VTT Integration**, is explicitly cut from the MVP as it requires a database and user accounts.
    

----------

#### Pillar 5: Trust & Reliability

**Strategic Focus:** The DM must trust the AI to be a reliable partner, which includes handling errors and limitations gracefully.

| # | Feature | Description | Priority | Effort | Value | Status |
|---|---|---|---|---|---|---|
| 5.1 | **Clear Error Messages** | Display user-friendly messages for API failures or other errors. | P2 | S | High | Should Have |
| 5.2 | **Loading Indicators** | Show spinners/indicators while the AI is generating text or images. | P1 | S | High | MVP |
| 5.3 | **"Regenerate" Response** | A button to get a different answer if the first one was unsatisfactory. | P2 | S | Med | Should Have |
| 5.4 | **System Prompt Guardrails** | The core prompt logic that ensures the AI is helpful and safe. | P1 | M | High | MVP |
| 5.5 | **Onboarding Disclaimer** | A brief message for first-time users explaining the AI's capabilities/limits. | P3 | M | Med | Future |`
  

**Key Decisions for Pillar 5:**

-   **What we're building:**  **Loading Indicators** and **System Prompt Guardrails** are non-negotiable P1 features. The app is unusable or untrustworthy without them.
    
-   **What we're deferring:**  **Clear Error Messages** and a **Regenerate** button are crucial for a polished user experience and are our top P2 priorities after the core P1s are complete.


### 🚀 MVP Feature Set (Week 13 Demo)

#### Core Features (Must Have - P1)

These are the 7 non-negotiable features essential for a functional and impressive MVP demo. They are ordered roughly by implementation dependency.

| Feature ID | Feature Name | User Story | Acceptance Criteria | Owner | Week |
|---|---|---|---|---|---|
| 2.1 | **Core Chat Interface** | As a DM, I want a simple chat UI to send and receive messages from ATLAS. | - [ ] UI has a message history view.<br>- [ ] UI has a text input and send button.<br>- [ ] Deployed to Vercel. | [Frontend Lead] | 4 |
| 5.4 | **System Prompt Guardrails** | As a DM, I want the AI to act like a helpful, creative assistant, not a generic chatbot. | - [ ] A V1 system prompt is implemented in the backend.<br>- [ ] The AI's persona is consistent in responses.<br>- [ ] The AI correctly refuses to provide game mechanics. | [AI/Visuals Lead] | 5 |
| 2.3 | **Session-based Memory** | As a DM, I want the AI to remember what we talked about earlier in the conversation. | - [ ] Backend correctly receives and processes chat history.<br>- [ ] The AI can answer questions about previously generated content.<br>- [ ] Context is maintained for at least 20 turns. | [Backend Lead] | 5 |
| 1.1, 1.2, 1.3 | **Core Content Generation** | As a DM, I want to ask for an NPC, location, or plot hook and get a creative, useful description. | - [ ] User can successfully generate all three content types.<br>- [ ] The quality passes the Golden Set benchmarks.<br>- [ ] The core text chat loop is fully functional. | [Backend Lead] | 5 |
| 5.2 | **Loading Indicators** | As a DM, I want to see that the app is working while the AI is "thinking". | - [ ] A loading spinner appears after a message is sent.<br>- [ ] The input form is disabled during generation.<br>- [ ] A different indicator is used for image generation. | [Frontend Lead] | 6 |
| 1.4 | **NPC Image Generation** | As a DM, I want to ask for a picture of my new NPC to show my players. | - [ ] User can request an image with a simple prompt.<br>- [ ] Backend performs the 2-step image generation.<br>- [ ] The generated image is displayed in the chat. | [AI/Visuals Lead] | 6 |
| 1.7 & 3.1 | **Contextual Follow-up** | As a DM, I want to ask follow-up questions and get ideas for unexpected player actions. | - [ ] The AI can correctly refine an existing NPC.<br>- [ ] The AI can provide plausible outcomes for an improv prompt.<br>- [ ] The responses are contextually relevant. | [AI/Visuals Lead] | 7 |
  

**Why These Features?**  
This set of features was chosen because it represents the complete, end-to-end "core loop" of the user experience. It allows a user to **create** something with text, **refine** it with follow-up questions, **visualize** it with an image, and use it for **improvisation**. This is the minimum set required to prove the value proposition of ATLAS as a conversational creative partner.

----------

#### Enhanced Features (Should Have - P2)

Features we will build if time permits, in order of priority. These are the highest-impact UX improvements.

| Feature ID | Feature Name | Why Valuable | Effort | Include If... |
|---|---|---|---|---|
| 2.2 | **Streaming Text Responses** | Makes the app feel dramatically faster and more "alive." It is the single biggest UX improvement we can make. | M | We complete P1 features by Week 9. |
| 4.1 & 4.2 | **Copy/Download Buttons** | Turns the app from a cool demo into a genuinely useful tool by letting DMs export the content. | S | The core loops are stable by Week 10. |
| 5.1 | **Clear Error Messages** | A professional application handles failure gracefully. This builds user trust. | S | We have time for UI polish in Week 11. |
| 5.3 | **"Regenerate" Response** | Gives the user more control and helps them recover from a bad generation without starting over. | S | We have time for UI polish in Week 11. |
  

----------

#### Nice-to-Have Features (Could Have - P3)

Features explicitly deferred to post-course development to maintain focus on the MVP.

| Feature ID | Feature Name | Why Deferred | Future Priority |
|---|---|---|---|
| 2.4 | **Markdown Rendering** | A pure "polish" feature. Plain text is sufficient for the MVP. | Low |
| 1.8 | **Location Image Generation** | More complex than NPC images (requires more descriptive prompts) and adds less unique value for the MVP. | High |
| 2.5 | **Persistent Memory** | Requires a database and user accounts, which is firmly in our "Run" phase scope. | Critical (for Phase 2) |


### 📊 Priority Matrix

#### High Impact, Low Effort (Do First) ⭐

These are the "quick wins" that provide the most value for the least amount of work. We will prioritize these after the core high-effort features are functional.

| Feature ID | Feature | Impact | Effort | Week |
|---|---|---|---|---|
| 4.1 & 4.2 | **Copy/Download Buttons** | High | S | 7 |
| 5.1 | **Clear Error Messages** | High | S | 8 |
| 5.3 | **"Regenerate" Response**| High | S | 10 |
  

**Rationale:** These features are small in terms of code but have a huge impact on making the application feel like a complete, professional tool. They are the first P2s we will tackle.

----------

#### High Impact, High Effort (Plan Carefully) 🎯

These are the critical, complex features that form the backbone of the MVP. They require the most planning and dedicated development time.

| Feature ID | Feature | Impact | Effort | Week |
|---|---|---|---|---|
| 1.1, 1.2, 1.3 | **Core Content Generation**| High | M | 5 |
| 1.4 | **NPC Image Generation** | High | L | 6 |
| 2.2 | **Streaming Text Responses**| High | M | 9 |
  

**Rationale:** These features deliver the core value and "wow" factor of ATLAS. Our project's success is defined by the successful implementation of these items.

----------

#### Low Impact, Low Effort (Quick Wins) ✅

These are "nice to have" polish features. We will only work on these if all P1 and high-priority P2 features are complete and stable.

| Feature ID | Feature | Impact | Effort | Week |
|---|---|---|---|---|
| 2.4 | **Markdown Rendering** | Low | S | 12 |
| 2.7 | **"Clear Conversation" Button**| Med | S | 12 |
  

**Rationale:** These improve the user experience but are not essential to the core workflow. They are perfect for a final "polish" week if we are ahead of schedule.

----------

#### Low Impact, High Effort (Avoid) ❌

These are features that, after analysis, do not provide enough value to justify the development time for our MVP. They are explicitly cut.

| Feature ID | Feature | Impact | Effort | Decision |
|---|---|---|---|---|
| 2.5 | **Persistent Memory** | High* | L | Cut from MVP |
| 4.4 | **"Save to Library"** | High* | L | Cut from MVP |
| 1.10 | **City/Town Generator** | Med | L | Cut from MVP |
  

**Rationale:** The features marked with an asterisk (*) have high potential impact but require a database and user accounts, making their actual effort massive. They are the definition of "Run" and "Fly" phase features and must be avoided to ensure we can deliver a polished MVP.

### 🗓️ Implementation Timeline

#### Week-by-Week Breakdown

This timeline integrates our feature roadmap with the project milestones, showing our planned focus for each week.

| Week | Focus | Features | Owner(s) | Dependencies |
|---|---|---|---|---|
| 4 | **Planning & Setup** | Finalize Roadmap, Architecture, & Backlog. Set up dev environments. | All | Completion of this document. |
| 5 | **Backend Foundation**| **#2.3** Session Memory, **#1.1** Core NPC Generation. | [Backend Lead] | Backend server is deployed. |
| 6 | **End-to-End Flow** | **#1.4** NPC Image Generation, **#5.2** Loading Indicators. | [AI/Visuals], [Frontend Lead]| Core text loop is functional. |
| 7 | **Live Play & UX** | **#3.1** Improvisation Aid, **#4.1 & #4.2** Copy/Download. | All | Core features are stable. |
| 8 | **User Testing & Iteration**| *No new features.* Focus on analyzing feedback and fixing critical bugs. | All | Successful user testing sessions. |
| 9 | **UX Enhancement** | **#2.2** Streaming Text Responses. | [Backend], [Frontend] | User feedback has been triaged. |
| 10| **Reliability** | **#5.1** Clear Error Messages, **#5.3** "Regenerate" Button. | [Frontend Lead] | Core flows are stable. |
| 11| **Safety Audit & Polish**| *No new features.* Focus on Red Team testing, prompt hardening, and bug fixing. | All | All P1 and P2 features are code-complete. |
| 12| **Final Polish & Buffer**| **#2.4** Markdown Rendering (if time), documentation, demo prep. | All | Safety audit passed. |
| 13| **Final Demo** | Final presentation, video, and submission. | All | All "Must Hit" targets are met. |


### 🔄 Feature Categories (By Strategic Type)

#### 🚀 Workflow Enhancer (Core UX)

Features that directly improve the primary user journey of creating content. This is the most critical category for ATLAS.

-   **[1.1, 1.2, 1.3] Core Content Generation:** The absolute foundation of the user's workflow.
    
-   **[1.7 & 3.1] Contextual Follow-up:** Enables a natural, iterative creative process instead of one-off generations.
    
-   **[2.2] Streaming Text Responses:** Makes the core workflow feel faster and more interactive.
    
-   **[4.1 & 4.2] Copy/Download Buttons:** Completes the workflow by allowing the user to take their creations with them.
    

**MVP Priority:**  **Critical.** The success of our demo hinges on the quality of these features.

----------

#### 🛡️ Trust Amplifier (Reliability & Safety)

Features that build the user's confidence in ATLAS as a reliable and safe creative partner.

-   **[5.4] System Prompt Guardrails:** Ensures the AI stays on-task and acts in a helpful, safe manner.
    
-   **[2.3] Session-based Memory:** A user must be able to trust that the AI remembers what they just said.
    
-   **[5.2] Loading Indicators:** Communicates that the system is working, preventing user frustration and confusion.
    
-   **[5.1] Clear Error Messages:** Builds trust by handling failures gracefully and transparently.
    

**MVP Priority:**  **High.** These features are essential for a professional, non-frustrating user experience.

----------

#### ✨ "Wow" Factor Engine (Impressiveness)

Features designed to create a memorable and impressive user experience that showcases the power of generative AI.

-   **[1.4] NPC Image Generation:** This is the primary "wow" feature. It transforms the tool from a text generator into a multi-modal creative suite.
    

**MVP Priority:**  **High.** While the app could function without it, this feature is key to making a strong impression in the final demo.

----------

#### ♻️ Retention Loop (Encouraging Repeat Use)

While our MVP is focused on a single session, some features lay the groundwork for why a user would want to come back.

-   **(Future) [2.5] Persistent Memory:** The ability to save and reload sessions is the ultimate retention feature for this tool.
    
-   **(Future) [4.4] "Save to Library":** Creating a personal collection of generated content would encourage long-term engagement.
    

**MVP Priority:**  **Low.** These are explicitly part of the "Run" phase and are cut from the MVP, but it's important to recognize their strategic value.

### 🎯 Success Metrics by Feature

#### How We'll Measure Each Core MVP Feature

| Feature ID | Feature | Success Metric | Target | How Measured |
|---|---|---|---|---|
| 1.1, 1.2, 1.3 | **Core Content Generation** | AI Quality Score | > 4.0 / 5.0 | Post-session user surveys and the Golden Set pass rate. |
| 1.4 | **NPC Image Generation** | Task Completion Rate | > 80% | Percentage of user testers who successfully generate a relevant image for their NPC. |
| 1.7 & 3.1 | **Contextual Follow-up** | Improvisation Utility | < 30 seconds | Timed task during user testing for the improvisation scenario. |
| 2.3 | **Session-based Memory** | Golden Set Pass Rate | 100% | The "memory" test case (E003) in our Golden Set must pass. |
| 5.2 | **Loading Indicators** | Qualitative Feedback | "Clear" / "Helpful" | User comments during testing; observe if users seem confused or impatient. |

### 📝 Feature Justification

#### Top Features Recommended by the Feature Prioritization Framework

Our process involved using an AI to brainstorm a wide array of features within our five strategic pillars. We then used a prioritization framework (weighing user value vs. implementation effort) to analyze these features. The top recommendations from this analysis directly formed our P1 and high-priority P2 feature set.

**1. [1.1, 1.2, 1.3] Core Content Generation**

-   **Category:** Workflow Enhancer
    
-   **User Need:** The fundamental need to create foundational content (NPCs, locations, plots) for a TTRPG.
    
-   **Why AI Recommended It:** The framework identified this as the absolute highest user value. Without this, the application has no purpose.
    
-   **Implementation Complexity:** Medium
    
-   **Our Decision:** ✅ **Include in MVP (Week 5).** This is the bedrock of ATLAS.
    

**2. [1.4] NPC Image Generation**

-   **Category:** "Wow" Factor Engine
    
-   **User Need:** A desire for visual aids to enhance imagination and share with players.
    
-   **Why AI Recommended It:** Ranked as the highest "Value" feature relative to its direct competitors (e.g., location images). It provides a unique, multi-modal experience that differentiates the product.
    
-   **Implementation Complexity:** High
    
-   **Our Decision:** ✅ **Include in MVP (Week 6).** The "wow" factor is critical for a successful demo.
    

**3. [2.3] Session-based Memory**

-   **Category:** Trust Amplifier
    
-   **User Need:** The expectation that a conversation is a continuous flow, not a series of isolated commands.
    
-   **Why AI Recommended It:** Identified as a prerequisite for any meaningful creative iteration. Without memory, features like "Follow-up Questions" are impossible.
    
-   **Implementation Complexity:** Medium
    
-   **Our Decision:** ✅ **Include in MVP (Week 5).** A non-negotiable dependency for a conversational UX.
    

**4. [1.7 & 3.1] Contextual Follow-up & Improvisation**

-   **Category:** Workflow Enhancer
    
-   **User Need:** The need to refine ideas and react to unexpected events, which is the essence of a DM's job.
    
-   **Why AI Recommended It:** The framework scored this high on user value, as it transitions the tool from a simple "generator" to a true "assistant" that can participate in a creative process.
    
-   **Implementation Complexity:** Medium
    
-   **Our Decision:** ✅ **Include in MVP (Week 7).** This demonstrates the "assistant" aspect of our vision.
### 🚫 Features We Decided Against

#### Cut Features (With Rationale)

This table summarizes key features that were considered during our AI-driven brainstorming but were explicitly cut from the MVP scope after applying our prioritization framework.

| Feature ID | Feature Name | Why AI Suggested It | Why We Cut It |
|---|---|---|---|
| 2.5 | **Persistent Memory** | Identified as a critical feature for user retention and creating a long-term relationship with the tool. | **Scope/Complexity.** This requires user accounts and a database, which firmly places it in our "Run" phase. The technical overhead is too high for the MVP. |
| 4.4 | **"Save to Library"** | Suggested this as a core part of the content management pillar, allowing users to organize their creations. | **Scope/Dependency.** Like persistent memory, this requires a database and authentication. It is a fantastic feature, but it's dependent on technology that is out of scope. |
| 1.10 | **City/Town Generator**| Proposed as a high-value "power feature" that could generate a complete adventure setting in one click. | **Effort/Value.** The implementation effort is very high, and its core value can be achieved by using the individual NPC and location generators sequentially. It's a "nice-to-have," not a "must-have." |
| 4.5 | **VTT Integration** | Identified as a major workflow enhancer for DMs who play online. | **Complexity/Dependencies.** This would require deep integration with third-party APIs (e.g., Roll20), which is a significant research and development effort on its own. It's a clear "Fly" phase feature. |

### 🔮 Future Roadmap (Post-Course)

#### Phase 2: Run (First 3 Months Post-Course)

**Focus:** Evolving from a single-session tool into a persistent campaign co-pilot by incorporating user feedback and foundational "Run" phase features.

**Features:**

-   **[2.5] Persistent Memory:** The top priority. Implement user accounts (via Clerk/Firebase) and a database (PostgreSQL) to allow users to save and resume their chat sessions.
    
-   **[4.4] "Save to Library":** Build an in-app library where users can save, tag, and organize their favorite generated NPCs, locations, and plot hooks.
    
-   **[1.8] Location Image Generation:** Expand the image generation capabilities to create atmospheric art for locations, not just character portraits.
    

**Success Criteria for Phase 2:**

-   Achieve 50+ weekly active users.
    
-   Users have created and saved over 1,000 items to their libraries.
    
-   User satisfaction score remains > 4.0/5.0 with the new features.
    

----------

#### Phase 3: Fly (Months 4-9 Post-Course)

**Focus:** Scaling the application, adding advanced creative tools, and beginning to explore integrations.

**Features:**

-   **[1.6] Dungeon Layout Ideas:** Introduce a new generator that can create thematic descriptions and layouts for multi-room dungeons.
    
-   **[4.5] VTT Integration (Initial):** Develop a simple "export to Roll20" feature that can push an NPC's description and portrait into a character handout in the user's VTT.
    
-   **Advanced AI Memory (RAG):** Implement a Retrieval-Augmented Generation system. Allow users to upload their own campaign notes, and ATLAS will use that specific context to provide more tailored and consistent advice.
    

**Success Criteria for Phase 3:**

-   Grow to 200+ weekly active users.
    
-   Successfully process and integrate with a user's custom campaign documents.
    
-   Establish a community of users who are actively providing feedback.
    

----------

#### Phase 4: Long-Term Vision

**Dream Features (If We Had Unlimited Time/Resources):**

1.  **Autonomous AI Player Character:**
    
    -   **Description:** Allow a DM to add an AI-controlled player to their party. The AI would have its own personality and goals, and could participate in the game alongside human players to fill out a small group.
        
    -   **Why Cool:** It would solve the common problem of not having enough players for a campaign.
        
    -   **Challenges:** Requires an incredibly sophisticated AI agent that can maintain a consistent persona, make logical decisions, and interact naturally with human players.
        
2.  **Fully AI-Powered TTRPG Experience:**
    
    -   **Description:** The ultimate "Fly" phase goal. A version of ATLAS that can act as the full Dungeon Master for a group of 1-4 players, managing the entire game state and narrative autonomously.
        
    -   **Why Cool:** This would be the holy grail of AI-driven TTRPGs, making the hobby accessible to anyone, anytime.
        
    -   **Challenges:** Requires solving complex problems in long-term state tracking, dynamic narrative generation, and multi-user interaction.
        

----------

Excellent. Let's complete the final sections. This part is about making the roadmap a "living document" and providing the evidence and context behind your decisions.

----------

### 🔄 Iteration & Updates

#### How This Roadmap Will Evolve

This document is not static; it is a living plan that will be updated at key project milestones to reflect new information and priorities.

**Week 8 (After User Testing Round 1):**

-   **Trigger:** We will have our first qualitative feedback from real users.
    
-   **Action:** The team will hold a dedicated session to review the user testing findings. We will re-prioritize our P2 ("Should Have") features based on what users found most valuable or frustrating. Effort estimates for remaining tasks will be adjusted based on our actual development velocity from the first sprints.
    

**Week 11 (After Safety Audit):**

-   **Trigger:** Completion of our internal Red Team testing.
    
-   **Action:** If any significant safety or prompt robustness issues are found, a new high-priority "fix" item will be added to the backlog. We will re-evaluate the timeline to ensure these critical fixes are implemented before the final demo.
    

**Week 12 (Before Final Demo Prep):**

-   **Trigger:** All planned P1 and P2 features are code-complete.
    
-   **Action:** The team will make a final " go/no-go " decision on any remaining polish features. We will confirm the final set of features to be included in the demo and mercilessly cut anything that is not 100% stable to ensure a polished and successful presentation.


**Document Version:** 1.0  
**Last Updated:** Week 4, 31/10/2025  
**Next Review:** Week 8 (after user testing feedback)
