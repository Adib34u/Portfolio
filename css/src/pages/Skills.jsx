import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Skills.css'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const skillsRef = useRef(null)

  const skillCategories = [
    {
      category: 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript/TypeScript', level: 94 },
        { name: 'HTML5/CSS3', level: 96 },
        { name: 'Framer Motion', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Next.js', level: 88 },
      ],
    },
    {
      category: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 89 },
        { name: 'Express.js', level: 87 },
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 84 },
        { name: 'RESTful APIs', level: 91 },
        { name: 'GraphQL', level: 80 },
      ],
    },
    {
      category: 'Design & UX',
      icon: '🎭',
      skills: [
        { name: 'Figma', level: 92 },
        { name: 'UI Design', level: 93 },
        { name: 'UX Research', level: 85 },
        { name: 'Responsive Design', level: 95 },
        { name: 'Animation Design', level: 88 },
        { name: 'Prototyping', level: 87 },
      ],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub', level: 94 },
        { name: 'VS Code', level: 96 },
        { name: 'Webpack/Vite', level: 88 },
        { name: 'Docker', level: 82 },
        { name: 'CI/CD Pipelines', level: 81 },
        { name: 'AWS/Netlify', level: 85 },
      ],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        },
      })

      gsap.to('.skill-bar-fill', {
        width: (i, el) => el.dataset.level + '%',
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="skills-page" ref={sectionRef}>
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Skills & Expertise</h1>
        <p className="subtitle">Technologies and tools I work with</p>
      </motion.div>

      <motion.div
        className="skills-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="skills-grid" ref={skillsRef}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2>{category.category}</h2>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                      duration: 0.5,
                    }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="skill-info">
                      <h3>{skill.name}</h3>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        initial={{ width: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="additional-skills"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>Other Competencies</h2>
          <div className="competencies-grid">
            {[
              'Problem Solving',
              'Team Leadership',
              'Agile/Scrum',
              'Code Review',
              'Mentoring',
              'Project Management',
              'Technical Writing',
              'Client Communication',
            ].map((comp, index) => (
              <motion.div
                key={index}
                className="competency-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                {comp}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="skills-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2>Ready to work on your next project?</h2>
        <motion.a
          href="/contact"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Collaborate With Me
        </motion.a>
      </motion.div>
    </div>
  )
}

export default Skills
