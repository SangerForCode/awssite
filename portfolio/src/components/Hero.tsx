const Hero = () => {
    return (
        <section className="section" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '0'
        }}>
            <div className="container">
                <p className="text-teal" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Hi, my name is</p>
                <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: '1.1', color: 'var(--white)' }}>
                    Ayush Sanger.
                </h1>
                <h2 style={{ fontSize: 'clamp(30px, 6vw, 60px)', lineHeight: '1.1', color: 'var(--slate)', marginBottom: '30px' }}>
                    Chemistry • Code • Innovation.
                </h2>
                <p className="text-slate" style={{ maxWidth: '600px', fontSize: '1.1rem', marginBottom: '50px' }}>
                    I’m a dual-degree scholar at BITS Goa, building solutions at the intersection of molecular science, machine learning, and community leadership. Currently Chief of BGSC.
                </p>
                <a href="#projects" className="btn" style={{ padding: '18px 36px', fontSize: '16px' }}>
                    View My Work
                </a>
            </div>
        </section>
    );
};

export default Hero;
