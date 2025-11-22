const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="text-lightest-navy" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className="text-teal">01.</span> About Me
                    <span style={{ height: '1px', background: 'var(--lightest-navy)', width: '300px', display: 'block' }}></span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '50px', marginTop: '50px' }}>
                    <div className="text-slate">
                        <p style={{ marginBottom: '15px' }}>
                            Hello! My name is Ayush and I enjoy creating things that live on the internet. My interest in web development started back when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            Fast-forward to today, and I’ve had the privilege of working at an <span className="text-teal">advertising agency</span>, a <span className="text-teal">start-up</span>, a <span className="text-teal">huge corporation</span>, and a <span className="text-teal">student-led design studio</span>. My main focus these days is building accessible, inclusive products and digital experiences at <span className="text-teal">Upstatement</span> for a variety of clients.
                        </p>
                        <p style={{ marginBottom: '15px' }}>
                            I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
                        </p>
                        <p>
                            Here are a few technologies I’ve been working with recently:
                        </p>
                        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px', listStyle: 'none' }}>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> JavaScript (ES6+)</li>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> TypeScript</li>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> React</li>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> Eleventy</li>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> Node.js</li>
                            <li style={{ position: 'relative', paddingLeft: '20px' }}><span style={{ position: 'absolute', left: 0, color: 'var(--teal)' }}>▹</span> WordPress</li>
                        </ul>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '300px',
                            aspectRatio: '1/1',
                            background: 'var(--teal)',
                            borderRadius: '4px',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {/* Placeholder for image */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'var(--navy)',
                                mixBlendMode: 'multiply',
                                filter: 'grayscale(100%) contrast(1)',
                                transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
                                borderRadius: '4px'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
