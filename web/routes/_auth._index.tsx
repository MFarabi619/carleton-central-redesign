import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";
import { NavBar } from "@/components/ui/nav-bar";
import { Header } from "@/components/ui/header";
import { SiteMapBlock, SiteMapSubHeading, SiteMapContent } from "@/components/ui/site-map-block";
import { i, s } from "vite/dist/node/types.d-aGj9QkWt";
import { url } from "inspector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session, gadgetConfig } = context;

  const userId = session?.get("user");
  const user = userId ? await context.api.user.findOne(userId) : undefined;

  if (!user) {
    return redirect(gadgetConfig.authentication!.signInPath);
  }

  return json({
    user,
  });
};

export type AuthOutletContext = RootOutletContext & {
  user: any;
};

export default function () {
  const { user } = useLoaderData<typeof loader>();
  const rootOutletContext = useOutletContext<RootOutletContext>();

  return (
    <div className="app">
      <NavBar />
      <div className="app-content">
        <div className="p-5 sm:px-10 ">
          <Header text="Site Map" />

          <div className="flex w-full max-w-sm items-center space-x-2 m-auto my-5">
            <Input type="text" placeholder="Type here to search!" />
            <Button type="submit">Search</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-5">
            {_site_map.map((item, index) => (
              <SiteMapBlock
                key={index}
                header={item.header}
                className="block"
              >
                {item.subheaders.map((subheader, index) => (
                  <SiteMapSubHeading
                    key={index}
                    title={subheader.title}
                    content={subheader.content}
                  />
                ))}
              </SiteMapBlock>
            ))}
          </div>


          {/* <Outlet
            context={{ ...rootOutletContext, user } as AuthOutletContext}
          /> */}
        </div>
      </div>
    </div>
  );
}

const _site_map = [
  {
    header: "Student Records",
    icon: "user",
    subheaders: [
      {
        title: "User Information",
        content: [
          { title: "Term & Transcript", url: "/timetable" },
          { title: "Name", url: "/name" },
          { title: "Address", url: "/address" },
          { title: "Phone", url: "/phone" },
          { title: "Email", url: "/email" },
          { title: "Emergency Contact", url: "/emergency-contact" },
          { title: "Privacy Settings", url: "/privacy-settings" },
          { title: "Notifications", url: "/notifications" },
          { title: "Security", url: "/security" },
          { title: "Sign Out", url: "/sign-out" }
        ]

      }
    ]
  },
  {
    header: "Academic Information",
    icon: "graduation-cap",
    subheaders: [
      {
        title: "Academic Information",
        content: [
          { title: "Courses", url: "/courses" },
          { title: "Grades", url: "/grades" },
          { title: "Transcripts", url: "/transcripts" },
          { title: "Degree Progress", url: "/degree-progress" },
          { title: "Academic Standing", url: "/academic-standing" },
          { title: "Graduation", url: "/graduation" },
          { title: "Co-op", url: "/co-op" },
          { title: "Internships", url: "/internships" },
          { title: "Research", url: "/research" }
        ]
      },
      {
        title: "Academic Resources",
        content: [
          { title: "Academic Calendar", url: "/academic-calendar" },
          { title: "Course Catalog", url: "/course-catalog" },
          { title: "Exam Schedule", url: "/exam-schedule" },
          { title: "Important Dates", url: "/important-dates" },
          { title: "Library", url: "/library" },
          { title: "Bookstore", url: "/bookstore" },
          { title: "Academic Advising", url: "/academic-advising" },
          { title: "Student Life", url: "/student-life" },
          { title: "Student Services", url: "/student-services" },
          { title: "Student Union", url: "/student-union" },
          { title: "Volunteering", url: "/volunteering" },
          { title: "Workshops", url: "/workshops" }
        ]
      }

    ]
  },

  {
    header: "Financial Information",
    icon: "cash",
    subheaders: [
      {
        title: "Financial Information",
        content: [
          { title: "Tuition", url: "/tuition" },
          { title: "Fees", url: "/fees" },
          { title: "Financial Aid", url: "/financial-aid" },
          { title: "Scholarships", url: "/scholarships" },
          { title: "Bursaries", url: "/bursaries" },
          { title: "Awards", url: "/awards" },
          { title: "Grants", url: "/grants" },
          { title: "Loans", url: "/loans" },
          { title: "Work Study", url: "/work-study" },
          { title: "Budgeting", url: "/budgeting" },
          { title: "Tax Forms", url: "/tax-forms" }
        ]
      },
      {
        title: "Financial Resources",
        content: [
          { title: "Financial Calendar", url: "/financial-calendar" },
          { title: "Financial Literacy", url: "/financial-literacy" },
          { title: "Financial Planning", url: "/financial-planning" },
          { title: "Financial Workshops", url: "/financial-workshops" },
          { title: "Financial Services", url: "/financial-services" },
          { title: "Financial Aid Office", url: "/financial-aid-office" },
          { title: "Financial Aid Calculator", url: "/financial-aid-calculator" },
          { title: "Financial Aid Application", url: "/financial-aid-application" },
          { title: "Financial Aid FAQ", url: "/financial-aid-faq" }
        ]
      }
    ]
  },
  {
    header: "Career Information",
    icon: "briefcase",
    subheaders: [
      {
        title: "Career Information",
        content: [
          { title: "Career Services", url: "/career-services" },
          { title: "Career Advising", url: "/career-advising" },
          { title: "Career Planning", url: "/career-planning" },
          { title: "Career Workshops", url: "/career-workshops" },
          { title: "Career Resources", url: "/career-resources" },
          { title: "Career Fair", url: "/career-fair" },
          { title: "Job Board", url: "/job-board" },
          { title: "Internship Board", url: "/internship-board" },
          { title: "Co-op Board", url: "/co-op-board" },
          { title: "Research Board", url: "/research-board" }
        ]
      },
      {
        title: "Career Resources",
        content: [
          { title: "Resume", url: "/resume" },
          { title: "Cover Letter", url: "/cover-letter" },
          { title: "Interview", url: "/interview" },
          { title: "Networking", url: "/networking" },
          { title: "LinkedIn", url: "/linkedin" },
          { title: "Portfolio", url: "/portfolio" },
          { title: "Job Search", url: "/job-search" },
          { title: "Internship Search", url: "/internship-search" },
          { title: "Co-op Search", url: "/co-op-search" },
          { title: "Research Search", url: "/research-search" }
        ]
      }
    ]
  }
]
