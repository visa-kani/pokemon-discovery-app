import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../component/button";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/discover-pokemon" });
  }, []);

  const MyCollections = useSelector((store: any) => store.collections.list);

  return (
    <>
      <div className=" bg-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            🔥 Pokemon Collection App
          </h1>
          <p className="text-gray-600 mb-6">
            Discover, collect, and organize your favorite Pokemon!
          </p>

          {/* Navigation Buttons */}
          <div className="sm:flex justify-center gap-4">
            <Button
              onClick={() => {
                setActiveTab("discover");
                navigate({ to: "/discover-pokemon" });
              }}
              btnClass="sm:mb-0 mb-4"
              btnSize="lg"
              btnMode={activeTab === "discover" ? "primary" : "secondary"}
            >
              {" "}
              🔍 Discover Pokemon
            </Button>
            <Button
              onClick={() => {
                setActiveTab("collection");
                navigate({ to: "/my-collections" });
              }}
              btnSize="lg"
              btnMode={activeTab === "collection" ? "primary" : "secondary"}
            >
              {" "}
              📚 My Collection ({MyCollections.length})
            </Button>
          </div>
        </div>
      </div>
      {/* 👇 Render child routes here */}
      <div>
        <Outlet />
      </div>
    </>
  );
};
