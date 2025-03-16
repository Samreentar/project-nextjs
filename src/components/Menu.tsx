'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/Dashboard/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/Dashboard/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/Dashboard/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/Dashboard/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Creation",
        href: "/Dashboard/list/ExamCreation",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/Dashboard/list/exams",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/result.png",
        label: "Evaluation",
        href: "/Dashboard/list/evaluation",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/Dashboard/list/results",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        action: "logout",
        href: "/",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
];

const Menu = () => {
  const router = useRouter();
  const role = localStorage.getItem("userRole");

  if (!role) router.push("/");

  const signout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="mt-4 text-sm">
      {/* Replacing Logo with SmartGrader text */}
      <div className="flex items-center justify-center lg:justify-start mb-8">
        <span
          className="text-4xl font-bold"
          style={{
            color: "#3D0158", // Purple color for SmartGrader
            fontFamily: "Arial, sans-serif",
          }}
        >
          SmartGrader
        </span>
      </div>

      {/* Menu Items */}
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role!)) {
              if (item.action === "logout") {
                return (
                  <button
                    onClick={signout}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                );
              }
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
