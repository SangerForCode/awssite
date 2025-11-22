const Projects = () => {
    const projects = [
        {
            title: "Student Marketplace",
            description: "A campus-wide marketplace platform facilitating buying and selling of student essentials. Scaled to 4,000+ active users across campuses.",
            tech: ["React Native", "Django", "PostgreSQL"],
            link: "#",
            github: "#"
        },
        {
            title: "Electrocatalyst Discovery",
            description: "Machine learning model to predict efficient electrocatalysts for renewable energy applications. Co-authored research paper bridging chemistry and ML.",
            tech: ["Python", "TensorFlow", "Scikit-learn"],
            link: "#",
            github: "#"
        },
        {
            title: "Campus Innovation Hub",
            description: "Centralized platform for student startups and research projects to find collaborators and funding.",
            tech: ["Next.js", "Node.js", "MongoDB"],
            link: "#",
            github: "#"
        }
    ];

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="text-lightest-navy" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className="text-teal">04.</span> Some Things I’ve Built
                    <span style={{ height: '1px', background: 'var(--lightest-navy)', width: '300px', display: 'block' }}></span>
                </h2>

                <div style={{ marginTop: '50px', display: 'grid', gap: '50px' }}>
                    {projects.map((project, index) => (
                        <div key={index} style={{
                            background: 'var(--light-navy)',
                            padding: '40px',
                            borderRadius: '4px',
                            position: 'relative'
                        }}>
                            <h3 className="text-white" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{project.title}</h3>
                            <div style={{
                                background: 'var(--lightest-navy)',
                                padding: '20px',
                                borderRadius: '4px',
                                marginBottom: '20px',
                                color: 'var(--slate)'
                            }}>
                                {project.description}
                            </div>
                            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--slate)', marginBottom: '20px' }}>
                                {project.tech.map(t => <li key={t}>{t}</li>)}
                            </ul>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href={project.github} className="text-light-slate hover:text-teal">GitHub</a>
                                <a href={project.link} className="text-light-slate hover:text-teal">External Link</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
