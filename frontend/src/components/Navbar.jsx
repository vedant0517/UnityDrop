import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition">
            Social Mentor
          </Link>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-3 border-r border-slate-700 pr-4">
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-slate-400 text-xs">{user.role}</p>
                  </div>
                  {user.role === 'volunteer' && (
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                      ⭐ {user.points}
                    </div>
                  )}
                </div>
                
                <Link
                  to={
                    user.role === 'donor' ? '/donor/dashboard' :
                    user.role === 'volunteer' ? '/volunteer/dashboard' :
                    '/admin/dashboard'
                  }
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-slate-800"
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
