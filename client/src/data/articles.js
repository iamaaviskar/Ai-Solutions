export const ARTICLES = [
  {
    slug: "hidden-cost-of-poor-digital-employee-experience",
    category: "Insights",
    title: "The Hidden Cost of Poor Digital Employee Experience",
    excerpt:
      "When employees struggle with broken tools and slow systems, productivity isn't the only thing that suffers. Here's what the data reveals about the true financial and cultural toll of a fractured digital workplace.",
    date: "April 18, 2026",
    readTime: "5 min read",
    featured: true,
    author: "Sarah Mitchell",
    authorRole: "Head of Insights, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "Every organisation has them — the slow login, the app that crashes before a big meeting, the ticketing system nobody trusts. Individually, these feel like minor irritants. Collectively, they represent one of the most underestimated costs in modern business.",
      },
      {
        type: "heading",
        text: "What the numbers actually say",
      },
      {
        type: "paragraph",
        text: "Research from the Workforce Institute estimates that inefficient technology costs organisations an average of 40 minutes of productive work per employee, per day. Across a team of 200, that is over 13,000 hours lost every year — before accounting for the knock-on effect on morale, retention, and recruitment.",
      },
      {
        type: "paragraph",
        text: "The financial toll is significant, but the cultural toll is harder to quantify and arguably more damaging. Employees who routinely fight their tools stop trusting that the business invests in them. That disengagement shows up quietly — in lower discretionary effort, higher absence rates, and a faster churn cycle.",
      },
      {
        type: "heading",
        text: "The visibility problem",
      },
      {
        type: "paragraph",
        text: "One reason poor digital experience persists is that leadership often can't see it. Senior stakeholders are typically insulated from frontline friction — their devices are well-maintained, their access is privileged, and their workflows are simpler. The employee struggling with a VPN issue at 8am rarely has a direct line to the person with budget authority.",
      },
      {
        type: "paragraph",
        text: "This is why proactive monitoring matters more than reactive ticketing. By the time a support ticket is raised, the friction has already occurred. What organisations need is the ability to detect degraded experiences before they hit productivity — and to surface that data in a form that business leaders can act on.",
      },
      {
        type: "heading",
        text: "What good looks like",
      },
      {
        type: "paragraph",
        text: "The organisations that get this right share a few things in common. They treat employee experience data with the same rigour they apply to customer experience data. They have feedback loops that are fast — measured in hours, not quarters. And they've invested in AI-powered tools that can distinguish signal from noise, flagging the issues that are systemic rather than one-off.",
      },
      {
        type: "paragraph",
        text: "At AI-Solutions, this is the problem we've built around. If you'd like to understand what a proactive approach would look like for your organisation, get in touch — we'll scope a prototype in days.",
      },
    ],
  },
  {
    slug: "how-our-ai-assistant-learns-your-organisations-language",
    category: "Product",
    title: "How Our AI Assistant Learns Your Organisation's Language",
    excerpt:
      "Context-aware responses aren't magic — they're the result of deliberate fine-tuning. We break down our approach to domain adaptation and how it results in genuinely useful internal tools.",
    date: "April 10, 2026",
    readTime: "7 min read",
    featured: true,
    author: "James Okafor",
    authorRole: "Lead AI Engineer, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "When organisations first deploy a general-purpose AI assistant, the results are often disappointing. The model gives answers that are technically correct but contextually wrong — citing policies that don't apply, using terminology that doesn't match internal conventions, or missing nuance that any experienced employee would catch immediately.",
      },
      {
        type: "paragraph",
        text: "This isn't a failure of the underlying model. It's a failure of adaptation. General models are trained on the internet, not on your organisation's Confluence, your HR policies, or your product documentation. Closing that gap is the core engineering challenge — and it's where we spend most of our time.",
      },
      {
        type: "heading",
        text: "The three layers of domain adaptation",
      },
      {
        type: "paragraph",
        text: "We think about context-awareness in three layers. The first is knowledge — what the model has access to. Using retrieval-augmented generation (RAG), we connect the assistant to your internal documents, wikis, and knowledge bases. When a question comes in, relevant content is pulled in real time and used to ground the response.",
      },
      {
        type: "paragraph",
        text: "The second layer is tone and convention. Every organisation has a voice — formal or casual, abbreviated or spelled out, acronym-heavy or plain English. We fine-tune the assistant's output style to match yours, so responses feel like they came from a knowledgeable colleague rather than a chatbot.",
      },
      {
        type: "paragraph",
        text: "The third layer is guardrails. Domain adaptation isn't just about what the model knows — it's about what it should and shouldn't say. We define clear boundaries around sensitive topics, escalation paths, and confidence thresholds so the assistant knows when to answer and when to hand off.",
      },
      {
        type: "heading",
        text: "How long does it take?",
      },
      {
        type: "paragraph",
        text: "Our standard onboarding process takes two to three weeks for a first working version — fast enough to validate with real users before committing to a full rollout. The assistant improves continuously from there, as usage data reveals the gaps and edge cases that no amount of upfront planning can anticipate.",
      },
      {
        type: "paragraph",
        text: "The result is an assistant that employees actually use, because it gives answers they can trust. If you'd like to see this in action for your own use case, reach out and we'll set up a demonstration.",
      },
    ],
  },
  {
    slug: "ai-in-the-workplace-regulation-responsibility-readiness",
    category: "Industry",
    title: "AI in the Workplace: Regulation, Responsibility, and Readiness",
    excerpt:
      "As the EU AI Act comes into force, organisations using AI-powered workplace tools must understand what compliance actually looks like — and how to stay ahead of it.",
    date: "March 28, 2026",
    readTime: "9 min read",
    featured: true,
    author: "Priya Nair",
    authorRole: "Policy & Compliance Lead, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "The EU AI Act is now in force, and for many organisations the response has been the same as it was to GDPR in 2018 — a combination of anxiety, confusion, and a queue of compliance consultants offering expensive reassurance. The good news is that for most workplace AI deployments, the practical requirements are more manageable than the headlines suggest.",
      },
      {
        type: "heading",
        text: "What the Act actually covers",
      },
      {
        type: "paragraph",
        text: "The Act classifies AI systems by risk level. The highest-risk category — which carries the most stringent obligations — includes systems used in employment decisions: recruitment, performance evaluation, and work allocation. If your AI tool makes or materially influences decisions about individual employees, you are in scope for the full compliance regime.",
      },
      {
        type: "paragraph",
        text: "Lower-risk systems — including most conversational assistants, knowledge tools, and productivity aids — face lighter-touch requirements, primarily around transparency. Users must be informed when they're interacting with an AI, and organisations must maintain basic documentation of how systems work and what data they use.",
      },
      {
        type: "heading",
        text: "The readiness gap",
      },
      {
        type: "paragraph",
        text: "Our conversations with organisations across the North East suggest a significant readiness gap — not because businesses are using AI irresponsibly, but because the documentation and governance structures required by the Act simply don't exist yet. Many teams have deployed AI tools quickly, without the audit trails, model cards, or data lineage records that compliance now requires.",
      },
      {
        type: "paragraph",
        text: "Closing this gap requires two things: a clear inventory of every AI system in use, and a governance framework that ensures new deployments are assessed before they go live. Neither is technically complex. Both require organisational will and someone with ownership.",
      },
      {
        type: "heading",
        text: "Building compliance in from the start",
      },
      {
        type: "paragraph",
        text: "Every AI product we build at AI-Solutions ships with a compliance-ready documentation package — model cards, data provenance records, audit logs, and transparency notices. Our view is that compliance shouldn't be retrofitted onto an AI system; it should be part of the architecture from day one.",
      },
      {
        type: "paragraph",
        text: "If you're unsure where your current AI deployments sit under the Act, we're happy to walk through your stack and flag any areas of concern. Get in touch to arrange a no-commitment scoping call.",
      },
    ],
  },
  {
    slug: "building-reliable-ai-pipelines-for-enterprise-environments",
    category: "Engineering",
    title: "Building Reliable AI Pipelines for Enterprise Environments",
    excerpt:
      "Reliability is non-negotiable when AI is woven into daily workflows. We share the architectural patterns and failure-mode thinking that underpin every product we ship.",
    date: "March 14, 2026",
    readTime: "11 min read",
    featured: false,
    author: "James Okafor",
    authorRole: "Lead AI Engineer, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "Building a convincing AI demo is straightforward. Building an AI system that works reliably at 9am on a Monday, under real load, with real data, is an entirely different engineering challenge. This post covers the patterns we've learned — sometimes the hard way — for shipping AI pipelines that enterprise teams can depend on.",
      },
      {
        type: "heading",
        text: "Design for failure, not just success",
      },
      {
        type: "paragraph",
        text: "Every external API call can fail. Every model inference can time out. Every retrieval step can return empty or irrelevant results. Robust pipelines treat these not as edge cases but as expected operating conditions. We use circuit breakers, graceful degradation paths, and fallback responses so that a failure in one component doesn't cascade into a complete system outage.",
      },
      {
        type: "heading",
        text: "Observability from day one",
      },
      {
        type: "paragraph",
        text: "You cannot improve what you cannot see. Every pipeline we build ships with structured logging, latency tracking, and semantic quality metrics. When something goes wrong in production, we want to know immediately — and we want enough context to understand why, not just that it happened.",
      },
      {
        type: "paragraph",
        text: "This is an area where many teams underinvest early and pay for it later. Retrofitting observability into a system that wasn't designed for it is painful. We treat it as a first-class requirement alongside functionality.",
      },
    ],
  },
  {
    slug: "why-prompt-engineering-is-now-a-core-business-skill",
    category: "Insights",
    title: "Why Prompt Engineering Is Now a Core Business Skill",
    excerpt:
      "The teams getting the most from AI tools are not necessarily the most technical — they're the ones who've learned to communicate clearly with machines. Here's how to build that muscle.",
    date: "March 5, 2026",
    readTime: "6 min read",
    featured: false,
    author: "Sarah Mitchell",
    authorRole: "Head of Insights, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "There is a persistent myth that getting value from AI requires technical expertise. In practice, the biggest differentiator between teams that get genuinely useful outputs and those that don't is much simpler: the ability to write a clear, specific instruction.",
      },
      {
        type: "heading",
        text: "What prompt engineering actually means",
      },
      {
        type: "paragraph",
        text: "Prompt engineering is not a programming discipline. It is a communication discipline. It requires clarity about what you want, precision about constraints and context, and the ability to iterate when the first attempt doesn't land. These are skills that good writers, analysts, and project managers already possess — they just need to learn to apply them to a new kind of interface.",
      },
      {
        type: "paragraph",
        text: "The organisations making the most of AI tools are investing in exactly this: short, practical training programmes that give non-technical employees the vocabulary and habits to get better outputs. The return on investment is immediate and measurable.",
      },
      {
        type: "heading",
        text: "Three habits that make the difference",
      },
      {
        type: "paragraph",
        text: "First, be specific about the output format. Telling an AI to 'summarise this document' will get you something. Telling it to 'summarise this document in three bullet points, each under 20 words, for a non-technical audience' will get you something useful. Second, give context about the purpose. The model cannot read your mind about who will read the output or why. Tell it. Third, iterate rather than start over. A mediocre first response is usually fixable with a follow-up instruction, not a blank slate.",
      },
    ],
  },
  {
    slug: "cutting-it-helpdesk-response-time-by-60-percent",
    category: "Case Study",
    title:
      "Cutting IT Helpdesk Response Time by 60% with a Conversational Agent",
    excerpt:
      "A North East logistics firm came to us with a backlog problem. Here's how we deployed a domain-specific AI assistant that resolved it — without replacing a single person.",
    date: "February 20, 2026",
    readTime: "8 min read",
    featured: false,
    author: "Priya Nair",
    authorRole: "Policy & Compliance Lead, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "Our client, a logistics company based in Teesside with around 350 employees, was facing a familiar problem: a two-person IT helpdesk fielding over 120 tickets per week, with an average first-response time of 14 hours. Employee frustration was high. The IT team was burning out. And the business had no budget to hire additional staff.",
      },
      {
        type: "heading",
        text: "The brief",
      },
      {
        type: "paragraph",
        text: "We were asked to explore whether a conversational AI assistant could handle first-line queries — password resets, VPN configuration, software access requests, and common hardware issues — without routing them through the helpdesk team. The requirement was clear: no job losses, no reduction in quality for complex issues, and a working prototype within three weeks.",
      },
      {
        type: "heading",
        text: "What we built",
      },
      {
        type: "paragraph",
        text: "We deployed a domain-adapted conversational agent, trained on the company's internal IT documentation and past ticket history. It could resolve around 65% of incoming queries autonomously — and for the remainder, it captured structured context before routing to the human team, cutting the time engineers spent on triage from an average of eight minutes per ticket to under two.",
      },
      {
        type: "heading",
        text: "The outcome",
      },
      {
        type: "paragraph",
        text: "Within six weeks of go-live, average first-response time had dropped from 14 hours to under 5. Employee satisfaction scores for IT support increased by 34 percentage points. The helpdesk team, freed from repetitive first-line queries, were able to focus on infrastructure improvements that had sat on the backlog for over a year. No roles were eliminated — they were redirected.",
      },
    ],
  },
  {
    slug: "from-prototype-to-production-our-4-week-delivery-model",
    category: "Product",
    title: "From Prototype to Production: Our 4-Week Delivery Model",
    excerpt:
      "Most AI projects stall in the proof-of-concept phase. We built our entire process around eliminating that stall — shipping something stakeholders can click through inside a month.",
    date: "February 11, 2026",
    readTime: "5 min read",
    featured: false,
    author: "James Okafor",
    authorRole: "Lead AI Engineer, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "The graveyard of enterprise AI is full of proofs of concept that never became products. The pattern is familiar: a promising demo, a round of internal enthusiasm, a procurement process, a lengthy requirements phase — and then, somewhere in the gap between ambition and implementation, momentum dies.",
      },
      {
        type: "heading",
        text: "Why we built around speed",
      },
      {
        type: "paragraph",
        text: "Our four-week delivery model exists specifically to prevent this. The goal is to put something tangible in front of real users before organisational inertia sets in. Not a slideshow. Not a wireframe. A working system that people can interact with and form genuine opinions about.",
      },
      {
        type: "paragraph",
        text: "Week one is discovery and scoping. We identify the highest-value problem, the data sources available, and the constraints we're working within. Week two is core build — the primary user flow, end to end. Week three is iteration based on internal feedback, edge-case handling, and integration with existing systems. Week four is handoff, documentation, and a structured user testing session with the client's own team.",
      },
      {
        type: "heading",
        text: "What changes with a real prototype",
      },
      {
        type: "paragraph",
        text: "The conversations organisations have about AI change dramatically once there's something real to react to. Objections become specific and solvable. Champions emerge. The business case writes itself. We've found that a working prototype consistently unlocks budget and stakeholder support that months of presentations never could.",
      },
    ],
  },
  {
    slug: "the-rise-of-the-digital-employee-experience-officer",
    category: "Industry",
    title: "The Rise of the Digital Employee Experience Officer",
    excerpt:
      "A new leadership role is quietly emerging across forward-thinking organisations. We explore what it means, why it matters, and what it signals about where enterprise tech is heading.",
    date: "January 29, 2026",
    readTime: "7 min read",
    featured: false,
    author: "Sarah Mitchell",
    authorRole: "Head of Insights, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "Five years ago, 'Digital Employee Experience' was a phrase used mostly by HR software vendors. Today, it is a board-level priority — and increasingly, a named executive function. The emergence of the Chief Digital Employee Experience Officer, or CDEEO, signals a meaningful shift in how organisations think about the relationship between technology and workforce performance.",
      },
      {
        type: "heading",
        text: "Why now?",
      },
      {
        type: "paragraph",
        text: "Several forces are converging. The post-pandemic shift to hybrid working made the quality of digital tools a make-or-break factor in whether remote employees could do their jobs effectively. At the same time, the tight labour market of the early 2020s made retention a strategic priority — and research consistently shows that poor technology is one of the top reasons employees leave.",
      },
      {
        type: "paragraph",
        text: "Add to this the rapid proliferation of AI tools, which has introduced a new layer of complexity: organisations now need someone with ownership of how AI is integrated into workflows, how employees are supported in adopting it, and how the inevitable friction points are identified and resolved.",
      },
      {
        type: "heading",
        text: "What this means for technology investment",
      },
      {
        type: "paragraph",
        text: "The emergence of this role is good news for organisations that have invested in employee experience infrastructure — and a signal for those that haven't. When digital experience has a named executive owner, investment decisions get made differently. The ROI calculation includes employee productivity, retention, and engagement alongside traditional cost metrics. That changes which tools get bought, and how.",
      },
    ],
  },
  {
    slug: "retrieval-augmented-generation-what-it-means-for-internal-knowledge-tools",
    category: "Engineering",
    title:
      "Retrieval-Augmented Generation: What It Means for Internal Knowledge Tools",
    excerpt:
      "RAG has moved from research paper to production standard in less than two years. Here's a plain-English breakdown of why it matters for building AI tools that actually know your business.",
    date: "January 16, 2026",
    readTime: "10 min read",
    featured: false,
    author: "James Okafor",
    authorRole: "Lead AI Engineer, AI-Solutions",
    body: [
      {
        type: "paragraph",
        text: "If you've spent any time around AI development in the last two years, you'll have encountered the acronym RAG. Retrieval-Augmented Generation has become the dominant architectural pattern for building AI systems that need to answer questions about specific, proprietary, or frequently-updated information. Here's what it actually means — and why it matters if you're building internal knowledge tools.",
      },
      {
        type: "heading",
        text: "The problem RAG solves",
      },
      {
        type: "paragraph",
        text: "Large language models are trained on a fixed dataset with a knowledge cutoff date. They don't know what's in your company wiki. They don't know your current pricing, your latest HR policy, or the contents of the email your CEO sent last week. If you ask them about these things, they either say they don't know or — worse — confabulate a plausible-sounding answer that happens to be wrong.",
      },
      {
        type: "paragraph",
        text: "RAG solves this by separating the retrieval step from the generation step. When a question comes in, the system first searches a curated knowledge base for relevant documents. It then passes those documents — along with the original question — to the language model, which generates an answer grounded in the retrieved content.",
      },
      {
        type: "heading",
        text: "Why it works so well for internal tools",
      },
      {
        type: "paragraph",
        text: "Internal knowledge tools have a particular set of requirements that RAG is well-suited to. The information is proprietary — it can't be baked into a public model. It changes regularly — policies are updated, products evolve, people join and leave. And accuracy matters enormously — an employee who gets a wrong answer about their holiday entitlement is going to lose trust in the tool fast.",
      },
      {
        type: "paragraph",
        text: "With RAG, the knowledge base can be updated independently of the model. When a policy changes, you update the document — not the AI. The model handles language and reasoning; the knowledge base handles facts. This separation of concerns makes the system easier to maintain, easier to audit, and more reliable in production.",
      },
      {
        type: "heading",
        text: "What it takes to do it well",
      },
      {
        type: "paragraph",
        text: "RAG is not magic. The quality of the system depends heavily on the quality of the underlying knowledge base. Poorly structured documents, duplicate content, and outdated information all degrade retrieval quality. Before building a RAG system, organisations need to do the unsexy work of auditing and organising their knowledge assets. The AI layer is the easy part — it's the data hygiene that determines whether the system works.",
      },
    ],
  },
];
