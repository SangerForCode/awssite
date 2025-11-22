import Link from 'next/link';

const Header = () => {
    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            backgroundColor: 'rgba(10, 25, 47, 0.85)',
            backdropFilter: 'blur(10px)',
            padding: '20px 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--teal)' }}>
                    AS.
                </Link>
                <nav>
                    <ul style={{ display: 'flex', gap: '30px', listStyle: 'none' }}>
                        <li><Link href="#about" className="text-light-slate hover:text-teal">About</Link></li>
                        <li><Link href="#skills" className="text-light-slate hover:text-teal">Skills</Link></li>
                        <li><Link href="#leadership" className="text-light-slate hover:text-teal">Leadership</Link></li>
                        <li><Link href="#projects" className="text-light-slate hover:text-teal">Projects</Link></li>
                        <li><Link href="#contact" className="btn">Connect</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
