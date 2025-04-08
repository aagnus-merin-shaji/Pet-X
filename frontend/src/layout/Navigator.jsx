// src/components/Navigator.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Logo, Menu, Cart } from "../icons/index";
import { avatar } from "../assets/imagedata";
import FloatingCart from "../components/FloatingCart";
import { useGlobalContext } from "../context/context";
import Logout from "../components/Logout";
import { markasreadAPI, notificationviewallAPI } from "../services/notificationServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Bell Icon Component
const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// Notification Tab Component
const NotificationTab = ({ notifications, onMarkAllAsRead }) => (
  <NotificationTabWrapper
    as={motion.div}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="notification-header">
      <h4>Notifications</h4>
      <button onClick={onMarkAllAsRead}>Mark all as read</button>
    </div>
    <ul className="notification-list">
      {notifications?.map((notification, idx) => (
        <motion.li
          key={idx}
          className={notification.read ? "read" : "unread"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <p>{notification.message}</p>
          <small>{notification.time}</small>
        </motion.li>
      ))}
    </ul>
  </NotificationTabWrapper>
);

const navLinks = [
  { name: "home", path: "/home" },
  { name: "services", path: "/services" },
  { 
    name: "lostpets", 
    path: "/adopter-lostfound",
    subItems: [
      { name: "view lost pets", path: "/adopter-lostfoundview" },
    ]
  },
  { name: "animals", path: "/portfolio" },
  { name: "adoptions", path: "/adopter-adoptions" },
  { name: "contact", path: "/contact" },
];

const Navigator = () => {
  const { showSidebar, showCart, hideCart, state } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading,

 error } = useQuery({
    queryFn: notificationviewallAPI,
    queryKey: ["view-all"],
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => markasreadAPI({ id }),
    mutationKey: ['markas-read'],
    onSuccess: () => {
      queryClient.invalidateQueries(['view-all']);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleBubble = () => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 1000);
  };

  const handleMarkAllAsRead = () => {
    if (notifications && notifications.length > 0) {
      const unreadNotifications = notifications.filter(n => !n.read);
      unreadNotifications.forEach(notification => {
        if (notification.id) {  // Assuming each notification has an id
          markAsReadMutation.mutate(notification.id);
        }
      });
    }
  };

  return (
    <NavigatorWrapper>
      <nav>
        <div className="nav-left">
          <motion.button
            onClick={showSidebar}
            className="menu-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu />
          </motion.button>
          <motion.div
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Logo />
          </motion.div>
          <form onSubmit={handleSearch} className="search-bar">
            <motion.input
              type="text"
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Search
            </motion.button>
          </form>
          <ul className="nav-links">
            {navLinks.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => link.subItems && setDropdownOpen(true)}
                onMouseLeave={() => link.subItems && setDropdownOpen(false)}
              >
                {link.subItems ? (
                  <div className="dropdown-container">
                    <Link to={link.path}>{link.name}</Link>
                    {dropdownOpen && (
                      <motion.ul
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {link.subItems.map((subItem, subIdx) => (
                          <motion.li
                            key={subIdx}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Link to={subItem.path}>{subItem.name}</Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>{link.name}</Link>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
          <div className="notification-container">
            <motion.button
              onClick={() => {
                setShowNotifications(!showNotifications);
                toggleBubble();
              }}
              className="notification-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BellIcon />
              {state.unreadNotifications > 0 && (
                <motion.span
                  className="notification-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {state.unreadNotifications}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {showNotifications && (
                <NotificationTab 
                  notifications={notifications || []}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showBubble && (
              <motion.div
                className="black-bubble"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>New Notification!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="avatar-btn"
            onClick={() => navigate("/adopter-profile")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={avatar} alt="avatar" />
          </motion.button>

          <Logout/>

          <FloatingCart className={`${state.showingCart ? "active" : ""}`} />
        </div>
      </nav>
    </NavigatorWrapper>
  );
};

// Styled Components
const NavigatorWrapper = styled.header`
  position: relative;
  padding: 2.4rem;
  border-bottom: 1px solid hsl(var(--divider));

  img,
  svg {
    display: block;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .menu-btn {
      display: block;
      background: none;
      border: none;
      cursor: pointer;

      @media only screen and (min-width: 768px) {
        display: none;
      }
    }

    .logo {
      margin-right: 3.2rem;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        padding: 0.5rem;
        border: 1px solid hsl(var(--divider));
        border-radius: 0.5rem;
        font-size: 1rem;
        width: 200px;

        &:focus {
          outline: none;
          border-color: yellow;
        }
      }

      button {
        padding: 0.5rem 1rem;
        background-color: yellow;
        color: hsl(var(--black));
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .nav-links {
      display: none;

      @media only screen and (min-width: 768px) {
        display: flex;
        gap: 3.2rem;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          position: relative;
          
          a {
            text-decoration: none;
            font-size: 1.5rem;
            text-transform: capitalize;
            color: hsl(var(--dark-grayish-blue));
            transition: color 0.3s ease;

            &:hover {
              color: hsl(var(--black));
            }
          }

          .dropdown-container {
            position: relative;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: hsl(var(--white));
            border: 1px solid hsl(var(--divider));
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            list-style: none;
            padding: 0.5rem 0;
            min-width: 180px;
            z-index: 10;

            li {
              padding: 0.5rem 1rem;

              a {
                display: block;
                font-size: 1.3rem;
                padding: 0.5rem 0;
              }

              &:hover {
                background-color: hsl(var(--light-gray));
              }
            }
          }
        }
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .notification-container {
      position: relative;
    }

    .notification-btn {
      position: relative;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: hsl(var(--black));
      }

      .notification-badge {
        user-select: none;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        background-color: hsl(var(--orange));
        font-weight: 700;
        color: hsl(var(--white));
        border-radius: 50%;
        padding: 0.2rem 0.6rem;
        font-size: 0.8rem;
      }
    }

    .black-bubble {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: black;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      z-index: 10;
    }

    .avatar-btn {
      height: 2.4rem;
      width: 2.4rem;
      border-radius: 50%;
      border: 2px solid transparent;
      background: none;
      cursor: pointer;
      transition: border-color 0.3s ease;

      img {
        width: 100%;
        border-radius: 50%;
      }

      &:hover {
        border-color: hsl(var(--orange));
      }
    }
  }

  @media only screen and (min-width: 768px) {
    padding-bottom: 4rem;

    .nav-right {
      gap: 2.4rem;

      .avatar-btn {
        height: 3.5rem;
        width: 3.5rem;
      }
    }
  }

  @media only screen and (min-width: 1000px) {
    padding: 4rem 0;
    max-width: 80%;
    margin: 0 auto;

    .nav-right {
      gap: 4.7rem;

      .avatar-btn {
        height: 5rem;
        width: 5rem;
      }
    }
  }
`;

const NotificationTabWrapper = styled(motion.div)`
  position: absolute;
  top: 3rem;
  right: 0;
  width: 300px;
  background-color: hsl(var(--white));
  border: 1px solid hsl(var(--divider));
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid hsl(var(--divider));

    h4 {
      margin: 0;
      font-size: 1.2rem;
    }

    button {
      background: none;
      border: none;
      color: hsl(var(--orange));
      cursor: pointer;
      font-size: 0.9rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .notification-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 1rem;
      border-bottom: 1px solid hsl(var(--divider));

      &.unread {
        background-color: hsl(var(--light-gray));
      }

      p {
        margin: 0;
        font-size: 1rem;
      }

      small {
        color: hsl(var(--dark-grayish-blue));
        font-size: 0.8rem;
      }
    }
  }
`;

export default Navigator;