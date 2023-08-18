import Link from "next/link";
import React from "react";
import LandingPageLayout from "@/components/Layout/LandingPageLayout";

function PrivacyPolicy() {
  return (
    <LandingPageLayout>
      <section className="bg-[#f7f9fb] px-5 lg:flex lg:h-5/6 lg:flex-row lg:items-center">
        <div className="max-w-5xl mx-auto flex flex-col-reverse justify-between lg:flex-row items-center py-10 lg:py-14">
          <div className="flex-1 ">
            <h1 className="py-4 text-center text-4xl font-bold">
              Privacy Policy
            </h1>

            <div className="row">
              <div className="col">
                <br />
                <hr />
                <br />
                <h1 className="h1">Privacy Policy</h1>
                <p>Last updated: May 2023</p>
                <h2>Information that is gathered from visitors</h2>
                <p>
                  In common with other websites, log files are stored on the web
                  server saving details such as the visitor's IP address,
                  browser type, referring page and time of visit.
                </p>
                <p>
                  Cookies may be used to remember visitor preferences when
                  interacting with the website.
                </p>
                <p>
                  Where registration is required, the visitor's email and a
                  username will be stored on the server.
                </p>
                <h2>How the Information is used</h2>
                <p>
                  The information is used to enhance the vistor's experience
                  when using the website to display personalised content and
                  possibly advertising.
                </p>
                <p>
                  E-mail addresses will not be sold, rented or leased to 3rd
                  parties.
                </p>
                <p>
                  E-mail may be sent to inform you of news of our services or
                  offers by us or our affiliates.
                </p>
                <h2>Visitor Options</h2>
                <p>
                  If you have subscribed to one of our services, you may
                  unsubscribe by following the instructions which are included
                  in e-mail that you receive.
                </p>
                <p>
                  You may be able to block cookies via your browser settings but
                  this may prevent you from access to certain features of the
                  website.
                </p>
                <h2>Cookies</h2>
                <p>
                  Cookies are small digital signature files that are stored by
                  your web browser that allow your preferences to be recorded
                  when visiting the website. Also they may be used to track your
                  return visits to the website.
                </p>
                <p>
                  3rd party advertising companies may also use cookies for
                  tracking purposes.
                </p>
                <h2>Google Ads</h2>
                <p>
                  Google, as a third party vendor, uses cookies to serve ads.
                </p>
                <p>
                  Google's use of the DART cookie enables it to serve ads to
                  visitors based on their visit to sites they visit on the
                  Internet.
                </p>
                <p>
                  Website visitors may opt out of the use of the DART cookie by
                  visiting the Google ad and content network privacy policy.
                </p>
                <p>
                  {` Along with our privacy policy. You are subjected to Google's
                privacy policy as well & terms of service.`}
                  <br />
                  Please see:{" "}
                  <Link
                    className="text-blue-500 hover:underline"
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                  >
                    Google API Services User Data Policy.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
}

export default PrivacyPolicy;
