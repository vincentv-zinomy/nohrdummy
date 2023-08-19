import { classNames } from "@/lib/common";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  WrenchIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
  BuildingOffice2Icon,
  PlusCircleIcon,
  LinkIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
  FolderOpenIcon
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { RoleTypes, rolePriority, useAuth } from "../contexts/AuthContext";
import Spinner from "../common/Spinner";
import Unauthorized from "./Unauthorized";
import { useToast } from "../hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";


const userNavigation = [
  // { name: "Your Profile", href: "/app/profile" },
  { name: "Settings", href: "/app/setting" },
  { name: "Sign out", href: "/app/signout" },
];



function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { authState, handleOrgChange } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddingNewOrg, setIsAddingNewOrg] = useState(false);

  // Define the allowed routes for each role
  const rolesRoutesAndNavigation = {
    [RoleTypes.ADMIN]: {
      routes: ["/app", "/app/*"],
      navigation: [

        { name: "Agents", href: "/app/org-agent", icon: FolderIcon },
        { name: "Projects", href: "/app/org-project", icon: FolderIcon },
        { name: "Team Members", href: "/app/team", icon: UsersIcon },
        { name: "Contacts", href: "/app/contacts", icon: UsersIcon },
        { name: "My Files", href: "/app/files", icon: FolderOpenIcon },
        {
          name: "Company Info",
          href: "/app/company",
          icon: InboxIcon,
        },
        {
          name: "Billing",
          href: "/app/billing",
          icon: CurrencyDollarIcon,
        },
        {
          name: "General Settings",
          href: "/app/setting/general-settings",
          icon: WrenchIcon,
        },
        {
          name: "My Comm Channels",
          href: "/app/setting/my-communication-channels",
          icon: PhoneIcon,
        },
        {
          name: "My Message Templates",
          href: "/app/setting/my-templates",
          icon: ChatBubbleLeftEllipsisIcon,
        },
        {
          name: "My Integrations",
          href: "/app/setting/integrations",
          icon: LinkIcon,
        },
      ]
    },
    [RoleTypes.TEAM_MEMBER]: {
      routes: ["/app", "/app/dashboard",
        "/app/signout", "/app/org-project", "/app/contacts",
        "/app/setting/general-settings", "/app/setting/integrations",
      ],
      navigation: [

        { name: "Projects", href: "/app/org-project", icon: FolderIcon, },
        { name: "Leads", href: "/app/contacts", icon: UsersIcon },
        {
          name: "General Settings",
          href: "/app/setting/general-settings",
          icon: WrenchIcon,
        },
        {
          name: "My Integrations",
          href: "/app/setting/integrations",
          icon: LinkIcon,
        },
      ]
    },
  }

  const changeCurrentOrg = async (orgId: string) => {
    await handleOrgChange(orgId);
  }
  const handleNewOrg = async () => {
    setIsAddingNewOrg(true);
    try {
      const createNewOrgRes = await axiosAPIWithAuth.post("/organizations/create-new");
      const newOrgId = createNewOrgRes.data;
      await handleOrgChange(newOrgId);
      toast.addToast("success", "New organization created successfully");

    }
    catch (err: any) {
      console.log(err);
      let errorMsg = "Something went wrong while starting conversation";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsAddingNewOrg(false);
  }
  const userHasAccessToRoute = (userRoles: RoleTypes[], pathname: string) => {
    return userRoles.some((role) => {
      const allowedRoutes = rolesRoutesAndNavigation[role].routes;

      return allowedRoutes.some((route) => {
        if (route.endsWith("*")) {
          return pathname.startsWith(route.slice(0, -1));
        }
        return route.toLowerCase() === pathname.toLowerCase();
      });
    });
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      if (window && window.$crisp && window.$crisp.push) {
        pathname.startsWith("/app") &&
          window.$crisp.push(["config", "position:reverse", [true]]);
      }
    }
  }, [authState])


  useEffect(() => {
    if (authState.user && authState.current_org && pathname.startsWith("/app")) {
      if (!authState.current_org.waitlist_approved && !pathname.startsWith("/app/waitlist")) {

        router.push(`/app/waitlist`);
      }
    }
  }, [router, authState]);

  if (authState.isLoading) {
    return (
      <>
        <Spinner color="text-indigo-500" />
      </>
    );
  } else if (!authState.isAuthenticated && pathname.startsWith("/app")) {
    router.push("/signin");
    return <div>Redirecting...</div>;
  } else if (authState.isAuthenticated && authState.user && authState.current_org && pathname.startsWith("/app")) {
    const userRoles = authState.current_org.roles;
    const hasAccess = userHasAccessToRoute(userRoles, pathname);

    // Get the user's navigation based on their roles
    const navigation = userRoles
      .map((role) => rolesRoutesAndNavigation[role].navigation)
      .flat()
      .filter((value, index, self) => {
        return self.findIndex((item) => item.href === value.href) === index;
      });

    if (!hasAccess) {
      return <Unauthorized />;
    }


    return (
      <div>
        <Script id="fb-pixel-scrips-id">
          {`
              !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '609725497530389');
    fbq('track', 'PageView');
              `}
        </Script>
        <Script
          strategy="lazyOnload"
          src="https://www.facebook.com/tr?id=609725497530389&ev=PageView&noscript=1"
        />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XCircleIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-24 w-auto"
                    src="/Zigment_logo.svg"
                    alt="zigment_logo"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={`${item.name}-main-nav-items`}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "cursor-pointer group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            pathname === item.href
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-24 w-auto"
                src="/Zigment_logo.svg"
                alt="zigment_logo"
              />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={`${item.name}-main-nav-items-sub-menu`}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        pathname === item.href
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">

                {
                  isAddingNewOrg && (
                    <Spinner color="text-indigo-500" />
                  )
                }
                <Menu as="div" className="relative inline-block text-left">
                  <div>

                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      {authState.current_org.org_name}
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>

                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {
                          authState.all_orgs.map((org) => (
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm cursor-pointer'
                                  )}
                                  onClick={() => {
                                    if (org.org_id !== authState.current_org?.org_id) {
                                      changeCurrentOrg(org.org_id)
                                    }
                                  }}
                                >
                                  {org.org_name}
                                  <span className={
                                    classNames("text-xs",
                                      org.org_id === authState.current_org?.org_id ? "text-rose-500" : "text-gray-400")
                                  }>
                                    {org.org_id === authState.current_org?.org_id && `(Current)`}
                                  </span>

                                </span>
                              )}
                            </Menu.Item>
                          ))
                        }

                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <span

                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm cursor-pointer'
                              )}
                              onClick={(e) => {
                                if (!isAddingNewOrg) {

                                  handleNewOrg()
                                }
                              }}
                            >
                              <PlusCircleIcon
                                className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              Add Organization

                            </span>
                          )}
                        </Menu.Item>

                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {authState.user && (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={authState.user.image}
                          alt=""
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default DashboardLayout;
