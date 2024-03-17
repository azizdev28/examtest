import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { MdCastForEducation } from "react-icons/md";
import { HiChartPie, HiUsers } from "react-icons/hi";

const DashSidebar = () => {
  return (
    <div className="fixed top-0">
      <Sidebar className="h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/" className="mb-5 inline-block">
              <Sidebar.Item
                icon={MdCastForEducation}
                className="text-2xl"
                as="div"
              >
                EduAdmin
              </Sidebar.Item>
            </Link>
            <Link to="/" className="mt-8 inline-block">
              <Sidebar.Item icon={HiChartPie} as="div">
                Dashboard
              </Sidebar.Item>
            </Link>

            <Link to="/products">
              <Sidebar.Item icon={HiUsers} as="div">
                Products
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
