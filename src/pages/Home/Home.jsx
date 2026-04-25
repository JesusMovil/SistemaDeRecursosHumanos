import { Link } from "react-router-dom";
import { FaUsers, FaFileAlt, FaChartLine, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css";
// 1. Importa las imágenes arriba
import home1 from "../../assets/img/Home1.jpg";
import home2 from "../../assets/img/Home2.jpg";
import home3 from "../../assets/img/Home3.jpg";

const features = [
  {
    icon: <FaUsers />,
    title: "Gestión de Empleados",
    desc: "Administra la información de tu equipo de manera centralizada.",
    color: "yellow",
  },
  {
    icon: <FaFileAlt />,
    title: "Reportes Detallados",
    desc: "Genera reportes completos sobre nómina y desempeño.",
    color: "blue",
  },
  {
    icon: <FaChartLine />,
    title: "Análisis de Datos",
    desc: "Visualiza métricas clave y tendencias.",
    color: "green",
  },
  {
    icon: <FaClock />,
    title: "Control de Asistencia",
    desc: "Monitorea horarios y ausencias automáticamente.",
    color: "purple",
  },
];

export default function Home() {
  return (
    <main className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <motion.div
          className="home-hero-bg"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        >
         <img src={home2} alt="" />
        </motion.div>

        <motion.div
          className="home-intro"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>
            Gestiona tu equipo <br />
            <span className="highlight">sin complicaciones</span>
          </h1>
          <p>
            Una plataforma moderna para automatizar procesos, mejorar la productividad
            y tomar decisiones con confianza.
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="home-section">
        <div className="home-cards">
          {features.map((item, index) => (
            <motion.article
              key={index}
              className="home-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`home-card-icon home-card-icon-${item.color}`}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* BLOQUE CON IMAGEN */}
      <section className="home-split">
        <motion.div
          className="home-split-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2>Optimiza tu gestión diaria</h2>
          <p>
            Reduce errores, automatiza tareas repetitivas y mejora la organización interna.
          </p>
        </motion.div>

        <motion.div
          className="home-split-img"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src={home3} alt="trabajo" />
        </motion.div>
      </section>

      {/* STORY */}
      <section className="home-story">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Una nueva forma de gestionar personas</h2>
          <p>
            Diseñado para empresas modernas que buscan eficiencia, claridad y crecimiento sostenible.
          </p>
        </motion.div>

        <div className="home-story-img">
          <img src={home1} alt="equipo" />
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        {[
          { value: "150+", label: "Empleados" },
          { value: "12", label: "Áreas" },
          { value: "98%", label: "Satisfacción" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="home-stat"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="home-cta">
        <Link to="/empleados" className="btn btn-primary home-cta-button">
          Gestionar mi equipo
        </Link>
      </section>

    </main>
  );
}