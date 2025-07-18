import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { cardStyles } from "../assets/dummystyle";
import { Check, Edit } from "lucide-react";
export const Cards = () => {
  const navigate = useNavigate();

  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <div className={cardStyles.profileCard}>
        <div className={cardStyles.profileInitialsContainer}>
          <span className={cardStyles.profileInitialsText}>
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </span>
        </div>
        <div>
          <div className={cardStyles.profileName}>{user.name || ""}</div>
          <button className={cardStyles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export const TemplateCard = ({ thumbnailImg, IsSelected, onSelect }) => {
  return (
    <div
      className={`group h-auto md:h-[300px] lg:h-[320px] flex flex-col bg-white border-2 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-3xl ${
        IsSelected
          ? "border-violet-500 shadow-lg shadow-violet-500/20 bg-violet-50"
          : "border-gray-200 hover:border-violet-300"
      }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={thumbnailImg}
            alt="Template Preview"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Selected overlay */}

          {IsSelected && (
            <div className="absolute inset-0 bg-violet-500/10 flex items-center justify-center">
              <div className="w-16 h-16 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Check size={24} className="text-violet-600" />
              </div>
            </div>
          )}

          {/* Hover gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center flex-col justify-center bg-gradient-to-br from-violet-50 via-violet-600 to-fuchsia-50 ">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-3">
            <Edit className="text-white" size={20} />
          </div>
          <span className="text-gray-700 font-bold">No Preview</span>
        </div>
      )}
    </div>
  );
};
