import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import SideMenu from "../composites/SideMenu";
import { SidebarTrigger } from "../components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProjects } from "../composites/FileUploader/hooks/use-projects";

type BreadcrumbSegment = {
  text: string;
  isLink: boolean;
  path?: string;
};

type Projects = Record<string, { name: string }>;

type SegmentMatcher = {
  matches: (segment: string, path: string[]) => boolean;
  render: (
    segment: string,
    path: string[],
    projects?: Projects
  ) => BreadcrumbSegment;
};

const projectMatcher: SegmentMatcher = {
  matches: (segment) => segment === "project",
  render: () => ({
    text: "Projects",
    isLink: false,
  }),
};

const projectIdMatcher: SegmentMatcher = {
  matches: (segment, path) => path[0] === "project" && path[1] === segment,
  render: (segment: string, _: string[], projects?: Projects) => ({
    text: projects?.[segment]?.name || segment,
    isLink: false,
  }),
};

const defaultMatcher: SegmentMatcher = {
  matches: () => true,
  render: (segment: string, path: string[]) => ({
    text: segment,
    isLink: true,
    path: `/${path.join("/")}`,
  }),
};

const matchers: SegmentMatcher[] = [
  projectMatcher,
  projectIdMatcher,
  defaultMatcher,
];

function findMatcher(segment: string, path: string[]): SegmentMatcher {
  return (
    matchers.find((matcher) => matcher.matches(segment, path)) || defaultMatcher
  );
}

function DashboardBreadcrumbs() {
  const location = useLocation();
  const { projects } = useProjects();
  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbSegments = segments.map((segment, index) => {
    const currentPath = segments.slice(0, index + 1);
    const matcher = findMatcher(segment, currentPath);
    return matcher.render(segment, currentPath, projects);
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {segment.isLink ? (
                <BreadcrumbLink asChild>
                  <Link to={segment.path!}>{segment.text}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{segment.text}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <SideMenu />
      <main className="grid grid-rows-[min-content_auto] w-full">
        <div className="flex items-center gap-4 px-4 py-2 border-b-[0.5px] border-gray-200">
          <SidebarTrigger />
          <DashboardBreadcrumbs />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
