import Image from "next/image"
import Link from "next/link"
import { Copy, Mail, ArrowDown, Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedSection } from "@/components/animated-section"
import { ProjectCard } from "@/components/project-card"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import { ExpandableText } from "@/components/expandable-text"
import { MobileHeader } from "@/components/mobile-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <MobileHeader />

      <main className="container py-8 md:py-12">
        {/* Hero/About Section */}
        <AnimatedSection
          id="about"
          className="py-16 md:py-24 flex flex-col items-center text-center relative overflow-hidden"
          animation="fade-in"
        >
          {/* Minimalistic Background Animation */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-primary/6 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-primary/7 rounded-full blur-xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '10s' }}></div>
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 rounded-full overflow-hidden ring-2 ring-primary/10 transition-all duration-300 hover:ring-primary/30">
            <Image
              src="/headshot.png"
              alt="Arthur Oker"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Arthur Oker
          </h1>
          <p className="text-xl text-muted-foreground mb-8">4th Year Computer Science & Philosophy Double Major @ University of Virginia</p>
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href="https://github.com/arthuroker" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href="https://www.linkedin.com/in/arthuroker/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
          <div className="mb-10">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/blog" className="flex items-center gap-2">
                Read My Blog
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 mb-16 p-3 rounded-full bg-muted/50 backdrop-blur-sm">
            <span className="text-muted-foreground px-2">arthuroker[at]email.virginia.edu</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href="mailto:arthuroker@email.virginia.edu">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Send email</span>
              </a>
            </Button>
          </div>
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-primary/60" />
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="py-16 md:py-24" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection as="div" animation="stagger-item" staggerIndex={0} threshold={0.1}>
              <ProjectCard
                title="CIO Connect"
                description="A website for discovering clubs (CIOs) at UVA. Developed a backend pipeline that transforms club data into OpenAI embeddings, stores them with FAISS, and enables fast semantic search via a REST API. Automated the full process from data ingestion to queryable vector search for student organizations. The backend is deployed with Google Cloud Run."
                imageSrc="/cioconnect-screenshot.JPG"
                imageAlt="CIO Connect Screenshot"
                technologies={["Python", "FastAPI", "Google Cloud", "OpenAI Embeddings", "OpenAI API"]}
                status="In Progress"
              />
            </AnimatedSection>
            <AnimatedSection as="div" animation="stagger-item" staggerIndex={1} threshold={0.1}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:translate-y-[-8px] border-primary/10 bg-background/50 backdrop-blur-sm">
                <div className="aspect-video relative">
                  <Image
                    src="/Phil Query ScreenShot.JPG"
                    alt="PhilQuery AI Philosophy Assistant"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">PhilQuery: AI Philosophy Assistant</h3>
                  <div className="mb-4">
                    <ExpandableText
                      text="Developed a Retrieval-Augmented Generation (RAG) pipeline using Python, Sentence-Transformers for embeddings, and FAISS for efficient vector search on philosophical texts."
                      maxLength={120}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Streamlit
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      FAISS
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Groq API
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://github.com/arthuroker/PhilQuery" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://phil-query.streamlit.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection as="div" animation="stagger-item" staggerIndex={2} threshold={0.1}>
              <ProjectCard
                title="Investment Tracker Visualizer"
                description="Developed a serverless stock data pipeline using Google Cloud Run, BigQuery, and Cloud Scheduler to automatically fetch and store financial data from Yahoo Finance."
                imageSrc="/investment-tracker-image.jpeg"
                imageAlt="Investment Tracker Visualizer"
                technologies={["Python", "Google Cloud", "PowerBI"]}
              />
            </AnimatedSection>

            <AnimatedSection as="div" animation="stagger-item" staggerIndex={3} threshold={0.1}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:translate-y-[-8px] border-primary/10 bg-background/50 backdrop-blur-sm">
                <div className="aspect-video relative">
                  <Image
                    src="/textbookappscreenshot.JPG"
                    alt="Textbook Lending Web Application"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Textbook Lending Web Application</h3>
                  <div className="mb-4">
                    <ExpandableText
                      text="Led a team of five as Scrum Master in an Agile environment, designing and implementing a full-stack web application for textbook lending with Google authentication."
                      maxLength={120}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Django
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      PostgreSQL
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Amazon S3
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Class project - no longer deployed or supported</p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection as="div" animation="stagger-item" staggerIndex={4} threshold={0.1}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:translate-y-[-8px] border-primary/10 bg-background/50 backdrop-blur-sm">
                <div className="aspect-video relative">
                  <Image
                    src="/COSAINT.png"
                    alt="Cosaint Game"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Cosaint</h3>
                  <div className="mb-4">
                    <ExpandableText
                      text="Directed and developed a semester-long game project using Unity, implementing backend systems including shop, round manager, ability/enemy frameworks, and AI pathfinding with Unity's NavMesh."
                      maxLength={120}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Unity
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      C#
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      NavMesh
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://github.com/UVASGD/spring-2025-cosaint" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://arthuroker.itch.io/cosaint" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Play on itch.io
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="py-12 md:py-16" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Experience
          </h2>

          {/* Work Experience */}
          <AnimatedSection as="div" className="mb-12" animation="fade-up" delay={100}>
            <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
            <div className="space-y-8">
              <AnimatedSection
                as="div"
                className="flex gap-4"
                animation="stagger-item"
                staggerIndex={0}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/keyence.png"
                    alt="KEYENCE Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">May 2025 - June 2025</div>
                  <h4 className="text-lg font-semibold mb-1">Technical Sales Intern</h4>
                  <div className="text-base mb-2">KEYENCE Corporation</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                    <li>Ranked 5th out of 50 interns, peaking at 3rd, while averaging 210+ daily B2B cold calls and winning 4-stage sales
competition (cold calling, technical pitching, objection handling, negotiation)</li>
                    <li>Generated $100k+ in qualified applications by engaging directly with engineers and decision-makers on complex
industrial automation solutions, including marking, labeling, traceability, and metrology systems</li>
                    <li>Demonstrated technical agility by rapidly learning sophisticated product lines and translating technical features
into quantifiable business value for prospective clients</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* School Experience */}
          <AnimatedSection as="div" animation="fade-up" delay={200}>
            <h3 className="text-2xl font-bold mb-6">School Experience</h3>
            <div className="space-y-8">
              <AnimatedSection
                as="div"
                className="flex gap-4"
                animation="stagger-item"
                staggerIndex={0}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/anthropic-claude-logo-2.jpg"
                    alt="Anthropic Logo"
                    width={48}
                    height={48}
                    className="object-contain scale-[1.3]"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Aug 2025 - Present</div>
                  <h4 className="text-lg font-semibold mb-1">Claude Builder Ambassador</h4>
                  <div className="text-base mb-2">Anthropic</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                    <li>Incoming Fall 2025</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection
                as="div"
                className="flex gap-4"
                animation="stagger-item"
                staggerIndex={1}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/uva logo.png"
                    alt="UVA Logo"
                    width={48}
                    height={48}
                    className="object-contain scale-[1.6]"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Aug 2022 - May 2026</div>
                  <h4 className="text-lg font-semibold mb-1">Bachelors' in Computer Science and Philosophy</h4>
                  <div className="text-base mb-2">University of Virginia</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                    <li>GPA: <span className="font-bold">3.841</span>/4.0</li>
                    <li>Computer Science Coursework:
                      <ul className="list-disc list-inside ml-4">
                        <li>Data Structures and Algorithms (Java/Python)</li>
                        <li>Software Development (Java/Python)</li>
                        <li>Computer Systems and Organization (C)</li>
                        <li>Discrete Math</li>
                        <li>Cybersecurity</li>
                      </ul>
                    </li>
                    <li>Philosophy Coursework:
                      <ul className="list-disc list-inside ml-4">
                        <li>Classical and Non-Classical Logic</li>
                        <li>Philosophy of Law</li>
                        <li>Political Philosophy</li>
                        <li>Free Will and Moral Responsibility Seminar</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection
                as="div"
                className="flex gap-4"
                animation="stagger-item"
                staggerIndex={1}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/sgd-logo.png"
                    alt="SGD Logo"
                    width={48}
                    height={48}
                    className="object-cover object-center scale-[3] -translate-y-0.5"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2024 - Present</div>
                  <h4 className="text-lg font-semibold mb-1">Student Game Developers Club</h4>
                  <div className="text-base mb-2">University of Virginia</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                    <li>Director (Dec 2024 - Apr 2025)</li>
                    <li>Treasurer (May 2024 - Present)</li>
                    <li>Member (Jan 2024 - Present)</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection
                as="div"
                className="flex gap-4"
                animation="stagger-item"
                staggerIndex={2}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/alltechlogo.png"
                    alt="All Tech Is Human Logo"
                    width={48}
                    height={48}
                    className="object-contain scale-[1.5]"
                  />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 - Present</div>
                  <h4 className="text-lg font-semibold mb-1">All Tech Is Human at UVA</h4>
                  <div className="text-base mb-2">University of Virginia</div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
                    <li>Philosophy Chair (Jan 2025 - Present)</li>
                    <li>Treasurer (Jan 2025 - Present)</li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </AnimatedSection>

        {/* Blog Section */}
        <AnimatedSection id="blog" className="py-16 md:py-24" animation="fade-up">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Latest Writing
            </h2>
            <Button
              variant="outline"
              className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link href="/blog" className="flex items-center gap-2">
                View All Posts
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <AnimatedSection as="div" animation="fade-up" delay={100}>
            <Card className="group overflow-hidden border-primary/20 bg-gradient-to-br from-background to-background/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Latest Post
                  </div>
                  <span>July 2025</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-3">
                  Chat, Is This Real? How AI is Reshaping Truth in Media
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The age of telling whether the media you see is AI or not is quickly passing. As generative AI systems become increasingly capable, we are rapidly approaching phenomenological equivalence...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href="https://open.substack.com/pub/arthuroker/p/chat-is-this-real-how-ai-is-reshaping?r=2r90m1&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Read Article
                        <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://arthuroker.substack.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Follow on Substack
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>


        </AnimatedSection>

        {/* Current Interests & Reading Section */}
        <AnimatedSection id="interests" className="py-12 md:py-16" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Current Interests & Reading
          </h2>

          <AnimatedSection as="div" animation="fade-up" delay={100}>
            <Card className="p-8 border-primary/10 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-6">Current Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Philosophy of Mind</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Superintelligence</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Mechanistic Interpretability</span>
                </div>
              </div>

              <div className="border-t border-primary/10 pt-6">
                <h3 className="text-xl font-bold mb-4">Currently Reading</h3>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <a 
                    href="https://www.goodreads.com/book/show/20527133-superintelligence" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    Superintelligence - Nick Bostrom
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-12 md:py-16" animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <AnimatedSection as="div" animation="scale-in" delay={100}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-4 border rounded-lg">
              <span className="text-lg">arthuroker[at]email.virginia.edu</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:arthuroker@email.virginia.edu">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection as="div" animation="fade-up" delay={200} className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href="https://github.com/arthuroker" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href="https://www.linkedin.com/in/arthuroker/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </AnimatedSection>
        </AnimatedSection>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          <div className="text-sm text-muted-foreground">© 2025 Arthur Oker. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
