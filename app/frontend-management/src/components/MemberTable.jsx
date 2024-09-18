// MemberTable.jsx
// This component displays a table of members using the Ant Design (antd) Table component.
// The table has columns for first name, last name, age, address, and tags, along with actions like editing and deleting.
import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios"; // Use axios or fetch for making API calls
const { Column, ColumnGroup } = Table;

// Hardcoded sample data as fallback
const fallbackData = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    firstName: "Michael",
    lastName: "Smith",
    age: 28,
    address: "San Francisco No. 5 Maple Street",
    tags: ["funny", "engineer"],
  },
  {
    key: "5",
    firstName: "Emily",
    lastName: "Davis",
    age: 36,
    address: "Chicago No. 2 River Road",
    tags: ["charming", "manager"],
  },
  {
    key: "6",
    firstName: "Sarah",
    lastName: "Taylor",
    age: 29,
    address: "Melbourne No. 3 Ocean Avenue",
    tags: ["kind", "nurse"],
  },
  {
    key: "7",
    firstName: "James",
    lastName: "Walker",
    age: 41,
    address: "Los Angeles No. 7 Elm Street",
    tags: ["smart", "designer"],
  },
  {
    key: "8",
    firstName: "Olivia",
    lastName: "Harris",
    age: 30,
    address: "Toronto No. 4 Pine Lane",
    tags: ["friendly", "artist"],
  },
  {
    key: "9",
    firstName: "David",
    lastName: "Johnson",
    age: 35,
    address: "Paris No. 6 Cherry Street",
    tags: ["brilliant", "scientist"],
  },
  {
    key: "10",
    firstName: "Sophia",
    lastName: "Lee",
    age: 27,
    address: "Hong Kong No. 9 Willow Street",
    tags: ["hardworking", "marketer"],
  },
  {
    key: "11",
    firstName: "Daniel",
    lastName: "Wilson",
    age: 39,
    address: "Berlin No. 10 Oak Road",
    tags: ["enthusiastic", "consultant"],
  },
  {
    key: "12",
    firstName: "Mia",
    lastName: "Clark",
    age: 26,
    address: "Singapore No. 12 Bay Avenue",
    tags: ["creative", "photographer"],
  },
  {
    key: "13",
    firstName: "Ethan",
    lastName: "Martinez",
    age: 40,
    address: "Tokyo No. 15 Forest Drive",
    tags: ["dedicated", "chef"],
  },
  {
    key: "14",
    firstName: "Isabella",
    lastName: "Lopez",
    age: 33,
    address: "Madrid No. 18 Blossom Street",
    tags: ["energetic", "lawyer"],
  },
  {
    key: "15",
    firstName: "Alexander",
    lastName: "Garcia",
    age: 31,
    address: "Rome No. 22 Sunset Boulevard",
    tags: ["curious", "researcher"],
  },
  {
    key: "16",
    firstName: "Charlotte",
    lastName: "Brown",
    age: 37,
    address: "Amsterdam No. 16 Canal Road",
    tags: ["polite", "editor"],
  },
  {
    key: "17",
    firstName: "Benjamin",
    lastName: "Moore",
    age: 45,
    address: "Seoul No. 20 Mountain View",
    tags: ["wise", "consultant"],
  },
  {
    key: "18",
    firstName: "Ava",
    lastName: "Miller",
    age: 34,
    address: "Dublin No. 13 Green Street",
    tags: ["adventurous", "travel agent"],
  },
  {
    key: "19",
    firstName: "William",
    lastName: "Davis",
    age: 38,
    address: "Vienna No. 11 Old Town",
    tags: ["ambitious", "entrepreneur"],
  },
  {
    key: "20",
    firstName: "Emma",
    lastName: "Martinez",
    age: 29,
    address: "Zurich No. 8 Lake View",
    tags: ["charming", "painter"],
  },
];

// MemberTable component fetches data and falls back to hardcoded data if the fetch fails
const MemberTable = () => {
  const [members, setMembers] = useState(fallbackData); // Initialize with hardcoded data
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // Replace this URL with your actual backend API endpoint
        const response = await axios.get(
          "http://localhost:5000/api/members"

        );
        if (response.data && response.data.length > 0) {
          setMembers(response.data); // Use the fetched data if available
        }
      } catch (error) {
        console.error("Failed to fetch members, using fallback data.", error);
        // If fetching fails, it will continue using the fallbackData
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []); // Empty dependency array ensures this runs only once after component mounts

  return (
    <Table dataSource={members} loading={loading}>
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup>
      
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default MemberTable;
