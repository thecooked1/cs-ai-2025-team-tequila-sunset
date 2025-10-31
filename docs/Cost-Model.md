# Token Usage & Cost Model (Version 2)

**Project Name:** ATLAS: A Conversational AI Assistant for Dungeon Masters
**Team Members:** [Member 1 Name], [Member 2 Name], [Member 3 Name]
**Date:** Week 4, [Date]
**Version:** 2.0 (Updated with Week 3-4 actual data)

---

## 📊 Executive Summary

**Current Cost Per Conversation Turn:** ~**$0.008**
**Projected Semester Cost (Optimized):** **~$25 - $35**
**Optimization Potential:** **~70%** cost reduction identified
**Budget Status:** ✅ **On track**

**Key Insight:**
> Our initial testing reveals that the conversation history is the single largest driver of token usage and cost. Implementing an intelligent context management strategy, rather than sending the full history every time, represents our biggest opportunity for cost savings.

---

## 1. Current Baseline (Week 4)

### Token Usage Breakdown

Based on actual usage from building and testing the core chat loop. Unlike a one-shot tool, our costs are per conversational turn.

**Per "Turn" Analysis (assumes a 10-turn-old conversation):**

| Component | Tokens (Average) | Cost (GPT-4o) | % of Total Cost |
| :--- | :--- | :--- | :--- |
| **System Prompt** | 300 tokens | $0.0015 | 19% |
| **Conversation History** | 800 tokens | $0.0040 | 51% |
| **New User Query** | 20 tokens | $0.0001 | 1% |
| **Input Subtotal** | **1,120 tokens** | **$0.0056** | **71%** |
| **Output (AI Response)** | 150 tokens | $0.00225 | 29% |
| **TOTAL PER TURN** | **1,270 tokens** | **~$0.00785** | **100%** |

**Key Findings:**
- **Conversation History** accounts for over 50% of our total cost per turn. This is our primary target for optimization.
- The **System Prompt** is a constant, fixed cost on every single turn.
- A single 30-turn conversation can cost upwards of $0.20, which is significant.

---
### Current Usage Patterns

**Week 3-4 Development Data:**

| Metric | Value |
| :--- | :--- |
| Total conversational turns (approx) | 150 turns |
| Total image generations | 10 images |
| Total tokens used (text) | ~190,000 tokens |
| Total cost incurred (text + image) | $1.52 (text) + $0.40 (image) = **$1.92** |
| Model used | GPT-4o (text), DALL-E 3 (image) |

---
## 2. Cost Model (Current vs. Projected)

### Total Semester Projection

| Phase | Turns/Images | Cost (Current Model) | Cost (Optimized) | Savings |
| :--- | :--- | :--- | :--- | :--- |
| Development (W3-8) | 1400 turns / 50 img | $13.00 | $4.50 | ~65% |
| Production (W9-13) | 3500 turns / 100 img | $31.50 | $11.00 | ~65% |
| **TOTAL SEMESTER** | **4900 turns / 150 img**| **$44.50** | **$15.50** | **~65%** |

---
## 3. Optimization Strategies

### Strategy 1: Compress System Prompt ⭐ High Impact
- **Current (300 tokens):** Overly descriptive, conversational.
- **Optimized (150 tokens):** More direct, using keywords and bullet points.
- **Token Savings:** 150 input tokens per turn.
- **Cost Savings:** ~$3.68 over the semester (8% total reduction).

### Strategy 2: Intelligent Context Management ⭐ Critical Impact
- **Current:** Send the entire, ever-growing chat history.
- **Optimized:** Implement a "Summarize and Truncate" strategy. When the history exceeds 1,000 tokens, use a cheap, fast model (GPT-4o-mini) to summarize the oldest half of the conversation. The context sent becomes `[System Prompt] + [Summary] + [Recent Messages]`.
- **Token Savings:** Reduces the average `Conversation History` from 800 tokens to ~400 tokens.
- **Cost Savings:** ~$14.70 over the semester (33% total reduction).

### Strategy 3: Hybrid Model Selection for Follow-ups ⭐ High Impact
- **Strategy:** Use `gpt-4o` for initial creative generation. Use `gpt-4o-mini` for simple follow-up questions.
- **Implementation:** Simple keyword logic in the backend to route the request. Assume a 50/50 split.
- **Cost Savings:** `gpt-4o-mini` is ~96% cheaper. For 50% of our turns, the cost will be negligible. This results in an additional ~$11.00 in savings (25% total reduction).

---
## 4. Implementation Roadmap

### Week 4-5 (Immediate)
- [ ] **Optimize system prompt.** (Effort: 1 hour)
- [ ] **Implement basic truncation** to prevent API errors. (Effort: 2 hours)

### Week 6-7 (High Priority)
- [ ] **Implement Hybrid Model Selection logic.** (Effort: 4 hours)
- [ ] **Implement "Summarize and Truncate" context strategy.** (Effort: 6-8 hours)

---
## 5. Budget Allocation (Full Semester)

| Category | Budgeted | Actual (W1-4) | Projected (W5-13) | Total |
| :--- | :--- | :--- | :--- | :--- |
| **AI API (Optimized)** | $30.00 | $1.92 | ~$13.58 | $15.50 |
| **Buffer/Contingency** | $20.00 | $0 | $20.00 | $20.00 |
| **TOTAL** | **$50.00** | **$1.92** | **$33.58** | **$35.50** |

**Budget Health:** ✅ **Healthy.** Our total projected cost is well within our target of securing ~$100 in student credits.

---
## ✅ Cost Optimization Checklist

**Week 4-5:**
- [ ] Compress system prompt from 300 to 150 tokens.
- [ ] Set up a cost tracking spreadsheet.
- [ ] Measure baseline performance with the new prompt.

**Week 6-7:**
- [ ] Implement hybrid model selection.
- [ ] Implement context summarization logic.
- [ ] Update cost projections with real data from the optimized model.

**Ongoing:**
- [ ] Monitor daily costs via OpenAI dashboard.
- [ ] Review weekly spend as a team.
