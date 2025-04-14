import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20, // Giữ padding dọc phù hợp
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: -50, 
    paddingTop: 60, // Tăng paddingTop nếu cần tránh status bar
    paddingBottom: 15,
    
  },

  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  placeholderRight: {
    width: 28,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#777",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#E57905",
  },
  activeTabText: {
    color: "#E57905",
    fontWeight: "bold",
  },
  ratingFilterContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  averageRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  averageRatingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  ratingStars: {
    flexDirection: "row",
  },
  ratingFilterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    marginRight: 10,
  },
  ratingFilterText: {
    fontSize: 12,
    color: "#333",
  },
  listContent: {
    padding: 15,
  },
  pendingItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  pendingImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  pendingInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 12,
    color: "#777",
  },
  pendingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  daysToReview: {
    fontSize: 12,
    color: "#777",
  },
  reviewButton: {
    backgroundColor: "#E57905",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  reviewButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewButtonBean: {
    color: "#FFD700",
    fontSize: 12,
    marginTop: 2,
  },
  reviewItem: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewDate: {
    fontSize: 12,
    color: "#777",
    marginVertical: 5,
  },
  reviewType: {
    fontSize: 12,
    color: "#777",
  },
  reviewContent: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  reviewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    marginVertical: 5,
  },
  reviewProduct: {
    fontSize: 12,
    color: "#E57905",
    marginVertical: 5,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    fontSize: 12,
    color: "#777",
    marginLeft: 5,
  },
  replyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  replyButtonText: {
    fontSize: 12,
    color: "#E57905",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
});

export default styles;
