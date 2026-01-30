const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Spinning Materia Diamond */}
        <div 
          className="w-12 h-12 border-2 border-primary animate-spin"
          style={{
            transform: 'rotate(45deg)',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.5), inset 0 0 10px hsl(var(--primary) / 0.3)',
            animationDuration: '1.5s',
          }}
        />
        
        {/* Pulsing Glow */}
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            boxShadow: '0 0 40px hsl(var(--primary) / 0.4)',
          }}
        />
      </div>
      
      {/* Loading Text */}
      <p className="absolute mt-24 text-sm text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default PageLoader;
