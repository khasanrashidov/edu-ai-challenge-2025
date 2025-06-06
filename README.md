# EDU AI Challenge 2025

## Overview

This repository contains materials for the Vention EDU AI Challenge 2025.

## Task 1: Practicing Chain-of-Thought Reasoning

### What is Chain-of-Thought Reasoning?

Chain-of-Thought (CoT) reasoning is an approach used in prompting AI models to think step-by-step, mimicking how humans often solve complex problems. Instead of jumping straight to an answer, the AI is encouraged to break down the problem into logical steps, leading to more accurate and explainable outcomes.

### When to Use CoT?

This technique is especially useful when:

- The answer depends on multiple factors
- Reasoning and justification are required
- The goal is to trace how a conclusion was reached

### Example Problem

**Question:** If a train travels 60 km in 1.5 hours, what is its average speed?

**Traditional Approach (Without CoT):**

```
40 km/h
```

**Chain-of-Thought Approach:**

```
1. The train travels 60 km in 1.5 hours
2. Speed is calculated as distance divided by time
3. 60 ÷ 1.5 = 40
∴ Answer: 40 km/h
```

### Benefits

Even for simple questions, CoT makes the logic transparent and reduces the chance of mistakes. This becomes especially valuable when dealing with more complex tasks and problems that require multiple steps of reasoning.

## Task 2: Natural Language to Structured Bug Report

### Key AI Techniques

- **Prompt Engineering**
- **Output Formatting**
- **Natural Language Understanding (NLU)**

### Understanding the Process

Modern AI assistants excel at transforming unstructured inputs into clear, structured information — when given the right instructions. This task leverages several key concepts:

1. **Prompt Engineering**

   - Carefully designed prompts guide the AI to produce consistent, useful results
   - Prompts are tailored to specific use cases and desired outcomes

2. **Output Formatting**

   - Prompts direct the AI to follow strict structures
   - Predefined sections in bug tickets ensure consistency
   - Standardized formatting improves readability

3. **Natural Language Understanding**
   - AI interprets vague or informal notes
   - Identifies implicit meaning in user descriptions
   - Generates complete, actionable content

### Practical Applications

AI models can significantly improve the bug reporting process by:

- Converting simple inputs into formal, well-structured text
- Generating content that fits conventions of tools like Jira, GitHub, or GitLab
- Improving communication across teams
- Reducing time spent on writing and rewriting vague tickets

## Task 3: Text Summarization and Sentiment Analysis

### Key AI Techniques

- **Text Summarization**
- **Sentiment Analysis**
- **Prompt Engineering**

### Text Summarization

The process of condensing a large body of text into a shorter version while retaining its essential meaning and key information. There are two main approaches:

1. **Extractive Summarization**

   - Selects and combines key sentences or phrases from the original text
   - Maintains original wording and context

2. **Abstractive Summarization**
   - Generates new sentences and paraphrases content
   - Focuses on conciseness while preserving meaning

### Sentiment Analysis

A natural language processing (NLP) technique used to determine the emotional tone of text. The analysis categorizes sentiment into three main categories:

1. **Sentiment Categories**

   - Positive: Reflecting optimism or satisfaction
   - Neutral: Lacking strong emotional indicators
   - Negative: Reflecting dissatisfaction, criticism, or pessimism

2. **Scoring System**
   - `-1`: Very negative sentiment
   - `0`: Neutral sentiment
   - `+1`: Very positive sentiment

### Example Analysis

**Example 1:**

```
Text: "I love how easy this app is to use. Great job!"
Sentiment: Positive
Score: +1
```

**Example 2:**

```
Text: "The website keeps crashing every time I try to log in."
Sentiment: Negative
Score: -1
```

## Task 4: Effective PR Review using Role Prompting

### Key AI Technique: Role Prompting

Role prompting is a technique that directs an AI model to adopt a specific persona, character, or expert perspective when generating responses or performing tasks. This approach helps elicit more specialized, contextually relevant, and nuanced responses.

### How Role Prompting Works

When assigned a role, the AI:

- Leverages training data to simulate knowledge and expertise
- Adopts the language style of the chosen role
- Applies reasoning patterns associated with that role
- Filters output through the lens of the designated persona
- Maintains consistency with the role's typical concerns and priorities

### Example Scenario: HR Policy Review

#### 1. HR Director Perspective

```
Focus Areas:
- Policy rationale clarity
- Legal compliance completeness
- Impact on company culture
- Tone assessment (authoritative yet supportive)
- Clear outline of responsibilities
```

#### 2. Employee Engagement Specialist Perspective

```
Focus Areas:
- Impact on morale and work-life balance
- Team cohesion considerations
- Isolation risk assessment
- Tone evaluation (empathy and support)
- Improvement suggestions
```

#### 3. Legal Compliance Officer Perspective

```
Focus Areas:
- Labor law adherence
- Regulatory compliance
- Legal risk identification
- Language precision
- Critical legal aspects
```

### Best Practices

1. **Clear Role Definition**

   - Specify the expertise level
   - Define the role's responsibilities
   - Outline key areas of focus

2. **Multiple Perspectives**
   - Use different roles for comprehensive analysis
   - Combine perspectives for better insights
   - Balance competing concerns

## Task 5: Few-Shot Prompting for Structured Feedback Analysis

### Key AI Techniques

- **Few-Shot Prompting**
- **Information Extraction**
- **Classification**
- **Chain-of-Thought Reasoning**
- **Structured Output Generation**

### Understanding Few-Shot Learning

Few-shot learning is an approach where a model learns to perform new tasks using only a small number of examples. Unlike traditional machine learning that requires thousands of data points, few-shot learning can effectively generalize from just one or two instances.

### When to Use Few-Shot Learning

This technique is particularly valuable when:

- Training data is limited
- Quick model adaptation is needed
- Prototyping without fine-tuning
- Testing new approaches rapidly
- Creating personalized interactions

### Example: Sentiment Classification

```
Input: Classify the sentiment (Positive/Neutral/Negative)

Example 1:
"The app is super intuitive and runs smoothly!"
→ Positive

Example 2:
"It's okay, but sometimes it lags."
→ Neutral

Example 3:
"I hate the latest update. Everything is broken!"
→ Negative

New Input:
"I like the new design."
→ Positive
```

### Best Practices

1. **Example Selection**

   - Choose diverse, representative examples
   - Include edge cases when possible
   - Maintain consistent formatting
   - Use clear, unambiguous cases

2. **Prompt Structure**
   - Start with clear instructions
   - Show multiple examples
   - Use consistent formatting
   - Include varied scenarios
