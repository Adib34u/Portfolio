import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Projects.css'

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const sectionRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include product filtering, cart management, and secure payment integration.',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: '#00f7ff',
      image: 'https://via.placeholder.com/400x250/1a1a1a/00f7ff?text=E-Commerce',
      link: '#',
    },
    {
      id: 2,
      title: 'Real-Time Chat App',
      description: 'Interactive messaging platform with real-time notifications, user authentication, and file sharing capabilities using WebSockets.',
      category: 'fullstack',
      technologies: ['React', 'WebSocket', 'Firebase', 'Tailwind'],
      color: '#ff00ff',
      image: 'https://via.placeholder.com/400x250/1a1a1a/ff00ff?text=Chat+App',
      link: '#',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Data visualization dashboard with interactive charts, real-time data updates, and customizable widgets for business intelligence.',
      category: 'frontend',
      technologies: ['React', 'D3.js', 'Redux', 'Chart.js'],
      color: '#f1ff76',
      image: 'https://via.placeholder.com/400x250/1a1a1a/f1ff76?text=Dashboard',
      link: '#',
    },
    {
      id: 4,
      title: 'Social Media Platform',
      description: 'Feature-rich social network with user profiles, posts, comments, likes, and follow system built with modern web technologies.',
      category: 'fullstack',
      technologies: ['React', 'Next.js', 'GraphQL', 'PostgreSQL'],
      color: '#00f7ff',
      image: 'https://via.placeholder.com/400x250/1a1a1a/00f7ff?text=Social+Media',
      link: '#',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio with smooth animations, dark theme, and optimized SEO for maximum visibility and engagement.',
      category: 'frontend',
      technologies: ['React', 'Framer Motion', 'GSAP', 'Vite'],
      color: '#ff00ff',
      image: 'https://via.placeholder.com/400x250/1a1a1a/ff00ff?text=Portfolio',
      link: '#',
    },
    {
      id: 6,
      title: 'AI Content Generator',
      description: 'Application powered by OpenAI API for generating creative content, code snippets, and intelligent summaries with fine-tuned prompts.',
      category: 'fullstack',
      technologies: ['React', 'Python', 'OpenAI API', 'Flask'],
      color: '#f1ff76',
      image: 'https://via.placeholder.com/400x250/1a1a1a/f1ff76?text=AI+Generator',
      link: '#',
    },
  ]

  const categories = ['all', 'frontend', 'fullstack']

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredProjects])

  return (
    <div className="projects-page" ref={sectionRef}>
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Featured Projects</h1>
        <p className="subtitle">Explore my latest work and achievements</p>
      </motion.div>

      <motion.div
        className="projects-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="filter-section">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="card-overlay">
                    <motion.a
                      href={project.link}
                      className="view-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View Project →
                    </motion.a>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="card-glow" style={{ background: project.color }}></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="projects-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Interested in collaborating?</h2>
        <motion.a
          href="/contact"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Talk
        </motion.a>
      </motion.div>
    </div>
  )
}

export default Projects
