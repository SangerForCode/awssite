const Skills = () => {
    const skills = {
        "Frontend": ["React.js", "React Native", "JavaScript", "HTML/CSS", "Next.js"],
        "Backend": ["Python", "Django", "Flask", "Node.js"],
        "AI/ML": ["TensorFlow", "Scikit-learn", "Pandas", "NumPy"]
    };

    return (
        <section id="skills" className="section">
            <div className="container">
                <h2 className="text-lightest-navy" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className="text-teal">02.</span> Skills
                    <span style={{ height: '1px', background: 'var(--lightest-navy)', width: '300px', display: 'block' }}></span>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '50px' }}>
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} style={{ background: 'var(--light-navy)', padding: '30px', borderRadius: '4px' }}>
                            <h3 className="text-teal" style={{ marginBottom: '20px' }}>{category}</h3>
                            <ul style={{ listStyle: 'none' }}>
                                {items.map(skill => (
                                    <li key={skill} className="text-slate" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--teal)', marginRight: '10px' }}>▹</span> {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
