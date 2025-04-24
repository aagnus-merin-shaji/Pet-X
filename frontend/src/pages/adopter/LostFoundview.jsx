import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { lostfoundviewallAPI, lostfoundviewuserAPI, lostfoundeditAPI } from "../../services/lostfoundServices";
import { FaPaw } from "react-icons/fa";

const LostFoundview = () => {
    const [expandedId, setExpandedId] = useState(null);
    const queryClient = useQueryClient();

    const { data: userReports } = useQuery({
        queryKey: ["lost-viewuser"],
        queryFn: lostfoundviewuserAPI,
    });

    const { data: lost } = useQuery({
        queryKey: ["lost-view"],
        queryFn: lostfoundviewallAPI,
    });

    const markAsFoundMutation = useMutation({
        mutationFn: lostfoundeditAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["lost-view"]);
            queryClient.invalidateQueries(["lost-viewuser"]);
        },
    });

    const toggleReadMore = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleMarkAsFound = async (id) => {
        try {
            await markAsFoundMutation.mutateAsync(id);
        } catch (error) {
            console.error("Error marking as found:", error);
        }
    };

    const isUserReport = (reportId) => {
        return userReports?.some(report => report._id === reportId);
    };

    if (!lost) return <div style={styles.loading}>Loading reports...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                <FaPaw style={{ marginRight: "10px", verticalAlign: "middle" }} />
                Lost Pets
            </h1>
            <div style={styles.grid}>
                {lost?.length > 0 ? (
                    lost.map((report) => (
                        <div key={report._id} style={styles.card}>
                            <div style={styles.cardContent}>
                                <h2 style={styles.reportName}>{report.animalName || "Unnamed Pet"}</h2>
                                <p style={styles.reportInfo}>Type: {report.animalType}</p>
                                <p style={styles.reportInfo}>
                                    Status:{" "}
                                    <span
                                        style={
                                            report.status === "found"
                                                ? styles.foundStatus
                                                : styles.lostStatus
                                        }
                                    >
                                        {report.status}
                                    </span>
                                </p>
                                <p style={styles.reportInfo}>
                                    Last Seen: {report.lastSeenLocation}
                                </p>
                                <p style={styles.reportInfo}>
                                    Date: {new Date(report.dateLostOrFound).toLocaleDateString()}
                                </p>
                            </div>
                            {report.photos && (
                                <img
                                    src={report.photos}
                                    alt={report.animalName || "Lost pet"}
                                    style={styles.reportPhoto}
                                />
                            )}
                            <div style={styles.cardContent}>
                                {expandedId === report._id && (
                                    <p style={styles.moreInfo}>
                                        <strong>Description:</strong>{" "}
                                        {report.description || "No additional details provided."}
                                    </p>
                                )}
                                <button 
                                    style={styles.contactButton}
                                    onClick={() => window.location.href = `tel:${report.contact}`}
                                >
                                    Contact: {report.contact}
                                </button>
                                {isUserReport(report._id) && report.status === 'lost' && (
                                    <button 
                                        style={styles.foundButton}
                                        onClick={() => handleMarkAsFound(report._id)}
                                        disabled={markAsFoundMutation.isPending}
                                    >
                                        {markAsFoundMutation.isPending ? 'Updating...' : 'Mark as Found'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={styles.noResults}>No lost or found pets reported yet.</div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "24px",
        backgroundColor: "#f7fafc",
        minHeight: "100vh",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#2d3748",
        textAlign: "center",
        marginBottom: "24px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        padding: "24px",
        backgroundColor: "#f7fafc",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardContent: {
        padding: "16px",
    },
    reportName: {
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "8px",
        color: "#2d3748",
    },
    reportInfo: {
        color: "#4a5568",
        marginBottom: "8px",
    },
    foundStatus: {
        color: "#38a169",
        fontWeight: "500",
    },
    lostStatus: {
        color: "#e53e3e",
        fontWeight: "500",
    },
    reunitedStatus: {
        color: "#4299e1",
        fontWeight: "500",
    },
    reportPhoto: {
        width: "100%",
        height: "240px",
        objectFit: "cover",
    },
    moreInfo: {
        marginTop: "8px",
        color: "#2d3748",
        minHeight: "24px", // Prevents layout shift
    },
    readMoreButton: {
        width: "100%",
        backgroundColor: "#4299e1",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginTop: "12px",
        transition: "background-color 0.3s ease",
    },
    contactButton: {
        width: "100%",
        backgroundColor: "#4299e1",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginTop: "8px",
        transition: "background-color 0.3s ease",
    },
    foundButton: {
        width: "100%",
        backgroundColor: "#38a169",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginTop: "8px",
        transition: "background-color 0.3s ease",
    },
    loading: {
        textAlign: "center",
        padding: "20px",
        fontSize: "18px",
        color: "#4a5568",
    },
    error: {
        textAlign: "center",
        padding: "20px",
        fontSize: "18px",
        color: "#e53e3e",
    },
    noResults: {
        textAlign: "center",
        padding: "20px",
        fontSize: "18px",
        color: "#718096",
        gridColumn: "1 / -1",
    },
};

export default LostFoundview;