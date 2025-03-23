
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-primary font-semibold text-xl">FHIR Health</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/') ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"
                )}
              >
                Dashboard
              </Link>
              
              <Link
                to="/observations"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/observations') ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"
                )}
              >
                Observations
              </Link>
              
              <Link
                to="/medications"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/medications') ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"
                )}
              >
                Medications
              </Link>
              
              <Link
                to="/vaccinations"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive('/vaccinations') ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"
                )}
              >
                Vaccinations
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden pt-2 pb-3 border-t border-border/40">
        <div className="px-2 space-y-1 sm:px-3 flex flex-row justify-between overflow-x-auto">
          <Link
            to="/"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
              isActive('/') ? "text-primary font-semibold" : "text-foreground/70"
            )}
          >
            Dashboard
          </Link>
          
          <Link
            to="/observations"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
              isActive('/observations') ? "text-primary font-semibold" : "text-foreground/70"
            )}
          >
            Observations
          </Link>
          
          <Link
            to="/medications"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
              isActive('/medications') ? "text-primary font-semibold" : "text-foreground/70"
            )}
          >
            Medications
          </Link>
          
          <Link
            to="/vaccinations"
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
              isActive('/vaccinations') ? "text-primary font-semibold" : "text-foreground/70"
            )}
          >
            Vaccinations
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
