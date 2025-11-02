import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/all";

import { useAuth } from "../context/authContext";
import { useUser } from "../context/userContext";

const SupportLayout = ({ children }) => {
  const { user } = useUser();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Support</h1>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span>{user?.name}</span>
              <Button variant="outline" size="sm">
                <FaUser />
              </Button>
            </>
          ) : (
            <>
              <span>Guest</span>
              <Button variant="outline" size="sm">
                <FaUser />
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="flex items-center justify-between p-4 border-t">
        <div>
          <p>© 2023 Support System</p>
        </div>
        <div>
          <p>Phone: 123-456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default SupportLayout;

const PeerSupport = ({ children }) => {
  const { user } = useUser();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Peer Support</h1>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span>{user?.name}</span>
              <Button variant="outline" size="sm">
                <FaUser />
              </Button>
            </>
          ) : (
            <>
              <span>Guest</span>
              <Button variant="outline" size="sm">
                <FaUser />
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="flex items-center justify-between p-4 border-t">
        <div>
          <p>© 2023 Support System</p>
        </div>
        <div>
          <p>Phone: 123-456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default PeerSupport;

const ScheduleSessionLink = () => {
  return (
    <Link to="/support/video-call" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition">
      Schedule Session
    </Link>
  );
};

export default ScheduleSessionLink;

const JoinGroupLink = () => {
  return (
    <Link to="/support/peer/anxiety" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
      Join Group
    </Link>
  );
};

export default JoinGroupLink;