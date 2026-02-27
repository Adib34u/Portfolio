import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 0.8,
        rotation: -10,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.about-text h2, .about-text p', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
      })

      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="about-page" ref={sectionRef}>
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About Me</h1>
        <p className="subtitle">Get to know me better</p>
      </motion.div>

      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="about-content">
          <div className="about-image" ref={imageRef}>
            <div className="image-frame">
              <img src="https://via.placeholder.com/300x400/1a1a1a/00f7ff?text=Your+Photo" alt="Profile" />
            </div>
          </div>

          <div className="about-text">
            <h2>I'm a Creative Developer & Designer</h2>
            <p>
              With expertise in modern web technologies, I create stunning digital experiences that combine beautiful design with robust functionality. I'm passionate about turning ideas into reality through clean code and creative problem-solving.
            </p>
            <p>
              My journey in tech started with a curiosity about how things work. Today, I specialize in building responsive web applications, crafting intuitive user interfaces, and mentoring aspiring developers.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or sharing knowledge with the community.
            </p>
            
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">💻</span>
                <h3>Web Development</h3>
                <p>Modern, responsive, and performant web applications</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🎨</span>
                <h3>UI/UX Design</h3>
                <p>Beautiful interfaces with exceptional user experience</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <h3>Performance</h3>
                <p>Optimized for speed and scalability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h2>By The Numbers</h2>
          <div className="stats-grid" ref={statsRef}>
            <motion.div
              className="stat-item"
              whileHover={{ y: -10 }}
            >
              <h3>50+</h3>
              <p>Projects Completed</p>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ y: -10 }}
            >
              <h3>30+</h3>
              <p>Happy Clients</p>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ y: -10 }}
            >
              <h3>5+</h3>
              <p>Years Experience</p>
            </motion.div>
            <motion.div
              className="stat-item"
              whileHover={{ y: -10 }}
            >
              <h3>100%</h3>
              <p>Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="about-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Let's Create Something Amazing Together</h2>
        <motion.a
          href="/contact"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start a Project
        </motion.a>
      </motion.div>
    </div>
  )
}

export default About
          className="page-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Me
        </motion.h1>

        <div className="about-content">
          <motion.div
            className="about-image"
            ref={imageRef}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/assets/611284661_1207938497973375_7730075186528248208_n.jpg"
              alt="Mutasim Billah Adib"
            />
            <div className="image-glow"></div>
          </motion.div>

          <div className="about-text">
            <p>
              Hi there! This is Mutasim Adib, a passionate Web Developer and Designer 
              dedicated to creating sleek, modern, and high-performance digital experiences.
            </p>
            <p>
              With a strong eye for detail and a love for innovation, I transform ideas 
              into interactive solutions that blend creativity with cutting-edge technology.
            </p>
            <p>
              My mission is simple: to craft designs that not only look premium but also 
              deliver seamless functionality.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default About
