import React, { useEffect, useState, CSSProperties } from 'react';

interface LoveCardData {
  className: string;
  icon: string;
  title: string;
  description: string;
}

interface LoveCardProps extends LoveCardData {
  delay: number;
}

// Inline styles object
const styles: Record<string, CSSProperties> = {
  lovePage: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    minHeight: '100vh',
    lineHeight: 1.6,
    color: '#333',
    overflowX: 'hidden',
    opacity: 0,
    transition: 'opacity 1.5s ease-in-out',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  lovePageFadeIn: {
    opacity: 1
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px'
  },
  floatingHearts: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1
  },
  floatingHeart: {
    position: 'absolute',
    opacity: 0.15,
    fontSize: '2rem',
    color: '#ff6b9d',
    userSelect: 'none',
    animation: 'floatHeart 8s ease-in-out infinite'
  },
  headerSection: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    marginBottom: '40px',
    boxShadow: '0 25px 60px rgba(255, 107, 157, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translateY(0)',
    opacity: 1
  },
  heartbeatContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    position: 'relative',
    zIndex: 1
  },
  heartbeat: {
    fontSize: '8rem',
    filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.8))',
    cursor: 'default',
    userSelect: 'none',
    animation: 'heartbeat 1.5s ease-in-out infinite'
  },
  loveTitle: {
    fontSize: 'clamp(4rem, 10vw, 7rem)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ff6b9d, #c44569, #f8b500, #ff1493)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '20px',
    fontFamily: "'Brush Script MT', cursive",
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 1,
    userSelect: 'none'
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    fontStyle: 'italic',
    position: 'relative',
    zIndex: 1
  },
  loveCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '40px',
    margin: '60px 0'
  },
  loveCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '50px',
    boxShadow: '0 20px 40px rgba(255, 107, 157, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid transparent',
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(50px)',
    cursor: 'pointer'
  },
  loveCardVisible: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  loveCardIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ffe4e6, #fce7f3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    margin: '0 auto 30px',
    boxShadow: '0 10px 30px rgba(255, 182, 193, 0.3)',
    border: '3px solid rgba(255, 182, 193, 0.3)',
    userSelect: 'none',
    animation: 'pulse 2s ease-in-out infinite'
  },
  loveCardTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '25px',
    color: '#2c3e50',
    fontFamily: "'Brush Script MT', cursive"
  },
  loveCardDescription: {
    color: '#555',
    fontSize: '1.2rem',
    lineHeight: 1.8,
    fontStyle: 'italic'
  },
  closingSection: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '60px',
    boxShadow: '0 25px 60px rgba(255, 107, 157, 0.2)',
    marginTop: '40px'
  },
  closingMessage: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    fontStyle: 'italic',
    marginBottom: '30px',
    lineHeight: 1.6
  },
  signature: {
    fontSize: '2.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'Brush Script MT', cursive",
    marginBottom: '20px',
    opacity: 0,
    transform: 'scale(0.8)',
    transition: 'all 0.6s ease-out'
  },
  signatureVisible: {
    opacity: 1,
    transform: 'scale(1)'
  },
  finalHearts: {
    fontSize: '2rem',
    userSelect: 'none',
    animation: 'bounce 1s ease-in-out infinite'
  }
};

// Animation keyframes as a style element
const AnimationStyles: React.FC = () => (
  <style>{`
    @keyframes floatHeart {
      0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
      25% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
      50% { transform: translateY(-10px) rotate(-3deg) scale(0.9); }
      75% { transform: translateY(-15px) rotate(3deg) scale(1.05); }
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .floating-heart-1 { top: 10%; left: 10%; animation-delay: 0s; }
    .floating-heart-2 { top: 20%; right: 15%; animation-delay: 2s; }
    .floating-heart-3 { top: 60%; left: 5%; animation-delay: 4s; }
    .floating-heart-4 { bottom: 30%; right: 10%; animation-delay: 6s; }
    .floating-heart-5 { bottom: 10%; left: 20%; animation-delay: 1s; }
    .floating-heart-6 { top: 40%; right: 5%; animation-delay: 3s; }
    .floating-heart-7 { top: 70%; left: 50%; animation-delay: 5s; }

    .love-card:hover {
      transform: translateY(-15px) scale(1.03) !important;
      box-shadow: 0 30px 60px rgba(255, 107, 157, 0.25) !important;
    }

    .love-card:focus {
      outline: 3px solid rgba(255, 107, 157, 0.5);
      outline-offset: 4px;
    }

    .my-everything-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #ff6b9d, #c44569);
    }

    .journey-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #ffd700, #ff8c00);
    }

    .promise-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #ff69b4, #ff1493);
    }

    .dreams-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #9370db, #8a2be2);
    }

    .future-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #ff1493, #dc143c);
    }

    .forever-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 30px 30px 0 0;
      background: linear-gradient(135deg, #ffb6c1, #ffc0cb);
    }

    .header-section::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    @media (max-width: 768px) {
      .love-cards-responsive {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }
      
      .love-card-responsive {
        padding: 30px !important;
      }
      
      .heartbeat-responsive {
        font-size: 6rem !important;
      }
      
      .container-responsive {
        padding: 15px !important;
      }
    }

    @media (max-width: 480px) {
      .header-section-mobile {
        padding: 40px 15px !important;
      }
      
      .love-card-mobile {
        padding: 20px !important;
      }
      
      .love-title-mobile {
        font-size: clamp(2.5rem, 8vw, 4rem) !important;
      }
      
      .subtitle-mobile {
        font-size: 1.2rem !important;
      }
    }
  `}</style>
);

const LovePageForIshmeen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Reset any existing body styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    
    // Fade in animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimationStyles />
      <div style={{
        ...styles.lovePage,
        ...(isVisible ? styles.lovePageFadeIn : {})
      }}>
        {/* Floating Hearts Background */}
        <FloatingHearts />

        <div style={styles.container}>
          {/* Header Section */}
          <HeaderSection />

          {/* Love Cards */}
          <LoveCards />

          {/* Closing Section */}
          <ClosingSection />
        </div>
      </div>
    </>
  );
};

const FloatingHearts: React.FC = () => {
  const hearts: string[] = ['💕', '💖', '💗', '💝', '💘', '❤️', '💞'];

  return (
    <div style={styles.floatingHearts}>
      {hearts.map((heart: string, index: number) => (
        <div
          key={index}
          className={`floating-heart-${index + 1}`}
          style={styles.floatingHeart}
        >
          {heart}
        </div>
      ))}
    </div>
  );
};

const HeaderSection: React.FC = () => {
  return (
    <div className="header-section" style={styles.headerSection}>
      <div style={styles.heartbeatContainer}>
        <div style={styles.heartbeat}>❤️</div>
      </div>
      <h1 style={styles.loveTitle}>Ishmeen</h1>
      <p style={styles.subtitle}>My Heart, My Soul, My Everything</p>
    </div>
  );
};

const LoveCards: React.FC = () => {
  const loveCardData: LoveCardData[] = [
    {
      className: "my-everything-card",
      icon: "💖",
      title: "My Everything",
      description: `Every moment with you is a treasure, every smile a blessing. You're not just my girlfriend,
        you're my best friend, my motivation, and my greatest support. Your love makes everything
        better, and I'm grateful for every day we share together. You light up my darkest days
        and make my brightest moments even more beautiful. In your eyes, I found my home.`
    },
    {
      className: "journey-card",
      icon: "✨",
      title: "Our Beautiful Journey",
      description: `From our first meeting to every cherished moment since, you've made my life brighter and more
        meaningful. Your kindness, strength, and beautiful soul inspire me to be better every day.
        I love how we grow together, dream together, and face life's adventures hand in hand. 
        Every day with you feels like a new chapter in our fairy tale, written with love and sealed with kisses.`
    },
    {
      className: "promise-card",
      icon: "🤍",
      title: "My Sacred Promise",
      description: `I promise to always be there for you, to support your dreams, to make you smile, and to
        love you more with each passing day. You're my present and my future, and I'm so blessed
        to have you in my life. Through every season, every challenge, every joy - I choose you,
        always and forever. My love for you is eternal, unbreakable, and infinite.`
    },
    {
      className: "dreams-card",
      icon: "🌟",
      title: "Dreams We Share",
      description: `Together, we're building something extraordinary - a love that grows stronger with each
        passing day. Your dreams become my dreams, your happiness becomes my purpose. I can't
        wait to see all the amazing places life will take us, knowing that with you by my side,
        every destination will be perfect. We're writing our own constellation in the stars.`
    },
    {
      className: "future-card",
      icon: "🌹",
      title: "Our Beautiful Future",
      description: `I dream of morning coffee with you, of lazy Sunday afternoons, of celebrating all our victories
        and weathering every storm together. I see us growing old together, still holding hands,
        still laughing at inside jokes, still discovering new reasons to fall in love with each other.
        Our future is painted in the colors of our love - vibrant, beautiful, and everlasting.`
    },
    {
      className: "forever-card",
      icon: "💍",
      title: "Forever & Always",
      description: `In a world full of temporary things, you are my constant. Through all of life's changes,
        my love for you remains the same - pure, deep, and unwavering. You are my yesterday's joy,
        today's blessing, and tomorrow's promise. I love you beyond words, beyond time, beyond
        everything. You are my forever, Ishmeen, and I am eternally yours.`
    }
  ];

  return (
    <div className="love-cards-responsive" style={styles.loveCards}>
      {loveCardData.map((card: LoveCardData, index: number) => (
        <LoveCard
          key={index}
          className={card.className}
          icon={card.icon}
          title={card.title}
          description={card.description}
          delay={index * 200}
        />
      ))}
    </div>
  );
};

const LoveCard: React.FC<LoveCardProps> = ({ 
  className, 
  icon, 
  title, 
  description, 
  delay 
}) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setIsInView(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleCardHover = (): void => {
    // Optional: Add any hover logic here
  };

  const handleCardClick = (): void => {
    // Optional: Add click functionality
    console.log(`Clicked on ${title} card`);
  };

  return (
    <div 
      className={`love-card-responsive love-card-mobile ${className}`}
      style={{
        ...styles.loveCard,
        ...(isInView ? styles.loveCardVisible : {})
      }}
      onMouseEnter={handleCardHover}
      onClick={handleCardClick}
      role="article"
      aria-label={`Love card: ${title}`}
    >
      <div style={styles.loveCardIcon} role="img" aria-label={`Icon: ${icon}`}>
        {icon}
      </div>
      <h2 style={styles.loveCardTitle}>{title}</h2>
      <p style={styles.loveCardDescription}>
        {description}
      </p>
    </div>
  );
};

const ClosingSection: React.FC = () => {
  const [showSignature, setShowSignature] = useState<boolean>(false);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setShowSignature(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="header-section-mobile" style={styles.closingSection}>
      <p style={styles.closingMessage}>
        "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        <br /><br />
        Thank you for being the love of my life, my partner in all adventures, and my reason to smile every day.
      </p>
      <div style={{
        ...styles.signature,
        ...(showSignature ? styles.signatureVisible : {})
      }}>
        With all my love, Ayush
      </div>
      <div style={styles.finalHearts} role="img" aria-label="Heart emojis">
        💕 💖 💕
      </div>
    </div>
  );
};

export default LovePageForIshmeen;
