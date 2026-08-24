import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, disableAnonymousLogin, signOut } from "../firebase";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const colors = {
    pink: "#FFB7C5",
    purple: "#6A3EA1",
    bg: "#FFF7FA",
    text: "#333333",
  };

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle logout
  const navigate = useNavigate(); // initialize navigate

  // Handle logout
  const handleLogout = async () => {
    try {
      disableAnonymousLogin?.(); // 
      await signOut(auth);
      setShowLogoutModal(false);
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="profile-page-container" style={{ background: colors.bg }}>
      {/* Navbar */}
      <nav className="profile-nav">
        <div className="profile-nav-content">
          <span className="profile-nav-title" style={{ color: colors.purple, cursor: "pointer" }} onClick={() => navigate("/home")}>
           💗 HeartTalk
          </span>
          <div className="flex gap-4">
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="profile-card-container">
        <div
          className="profile-card"
          style={{ background: colors.bg, border: `2px solid rgba(255,183,197,0.6)` }}
        >
          {/* Avatar */}
          <div className="profile-header">
            <div
              className="avatar-circle"
              style={{
                background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})`,
                border: "5px solid white",
              }}
            >
              👤
            </div>
            <h1 className="profile-title" style={{ color: colors.purple }}>
              My Profile
            </h1>
            <p className="profile-info-text"><b>Email:</b> {user?.email || "Anonymous"}</p>
            <p className="profile-info-text"><b>User ID:</b> {user?.uid}</p>
          </div>

          {/* Settings */}
          <div
            className="settings-box"
            style={{ background: colors.bg, border: `2px solid rgba(255,183,197,0.5)` }}
          >
            <h2 className="settings-title" style={{ color: colors.purple }}>
              Settings
            </h2>
            <div className="settings-list">
              <button
                className="setting-btn"
                style={{ color: colors.text }}
              >
                <span>Notifications</span> <span className="text-2xl">🔔</span>
              </button>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="setting-btn"
                style={{ color: colors.text }}
              >
                <span>Logout</span> <span className="text-2xl">🚪</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="logout-modal-backdrop" style={{ background: "rgba(0,0,0,0.45)" }}>
          <div className="logout-modal-card">
            <div className="logout-modal-emoji">👋</div>
            <h3 className="logout-modal-title" style={{ color: colors.purple }}>Logout?</h3>
            <p className="logout-modal-text" style={{ color: colors.text }}>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="logout-modal-btn-cancel"
                style={{ background: colors.bg, color: colors.purple }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="logout-modal-btn-confirm"
                style={{ background: colors.pink }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover + Font Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        .profile-page-container {
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
        }

        .profile-nav {
          background: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .profile-nav-content {
          max-width: 1150px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .profile-nav-title {
          font-size: 24px;
          font-weight: 700;
        }

        .profile-card-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 40px 16px;
        }

        .profile-card {
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 768px;
          margin: 0 auto;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .avatar-circle {
          width: 128px;
          height: 128px;
          margin: 0 auto 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
          box-shadow: 0 10px 25px rgba(106, 62, 161, 0.2);
        }

        .profile-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .profile-info-text {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .settings-box {
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 512px;
          margin: 0 auto;
        }

        .settings-title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .setting-btn { 
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-radius: 12px;
          font-size: 18px;
          width: 100%;
          max-width: 448px;
          border: none;
          background: white;
          cursor: pointer;
          transition: 0.25s; 
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .setting-btn:hover { 
          background: rgba(255,183,197,0.2); 
          transform: scale(1.01); 
        }

        /* Logout Modal */
        .logout-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
          padding: 16px;
        }

        .logout-modal-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 25px rgba(0,0,0,0.15);
          padding: 32px;
          max-width: 384px;
          width: 100%;
          text-align: center;
        }

        .logout-modal-emoji {
          font-size: 60px;
          margin-bottom: 16px;
        }

        .logout-modal-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .logout-modal-text {
          font-size: 18px;
          margin-bottom: 24px;
        }

        .logout-modal-actions {
          display: flex;
          gap: 16px;
        }

        .logout-modal-btn-cancel,
        .logout-modal-btn-confirm {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 18px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .logout-modal-btn-cancel:hover,
        .logout-modal-btn-confirm:hover {
          transform: translateY(-1px);
        }

        .logout-modal-btn-confirm {
          color: white;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .profile-card {
            padding: 24px 16px;
          }
          .profile-title {
            font-size: 28px;
          }
          .settings-box {
            padding: 24px 16px;
          }
          .settings-title {
            font-size: 22px;
            margin-bottom: 16px;
          }
          .setting-btn {
            font-size: 16px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
}
