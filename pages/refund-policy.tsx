import LandingPageLayout from '@/components/Layout/LandingPageLayout'; 
import Link from 'next/link';
import React from 'react';

function TermsOfService() {
  return (
    <LandingPageLayout>
    <div className='max-w-5xl mx-auto flex flex-col-reverse justify-between lg:flex-row items-center py-10 lg:py-14'>
      <section className='    lg:flex   lg:flex-row lg:items-center'>
        <div className='flex-1 '>
          <h1 className='py-4 text-center text-4xl font-bold'>
            Terms & Conditions
          </h1>

          <div>
            <div>
              {' '}
              Please read these terms and conditions ("terms and conditions",
              "terms") carefully before using zigment.ai website (“website”,
              "service") operated by Zinomy Partners ("us", 'we",
              "our").{' '}
              <h2 className='text-left text-2xl font-bold'>
                Conditions of use
              </h2>
              By using this website, you certify that you have read and reviewed
              this Agreement and that you agree to comply with its terms. If you
              do not want to be bound by the terms of this Agreement, you are
              advised to leave the website accordingly. Zinomy Partners only grants use and access of this website, its products,
              and its services to those who have accepted its terms.{' '}
              <h2 className='text-left text-2xl font-bold'>Privacy policy</h2>{' '}
              Before you continue using our website, we advise you to read our
              privacy policy{' '}
              <Link className='text-blue underline' href='/privacy-policy'>
                {' '}
                policy
              </Link>{' '}
              regarding our user data collection. It will help you better
              understand our practices.
              <h2 className='text-left text-2xl font-bold'>
                Limitation on liability
              </h2>
              Zinomy Partners is not liable for any damages that
              may occur to you as a result of your use of our website. Zinomy Partners
             reserves the right to edit, modify, and
              change this Agreement at any time.This Agreement is an
              understanding between Zinomy Partners and the user,
              and this supersedes and replaces all prior agreements regarding
              the use of this website.
            </div>
          </div>
        </div>
      </section>
    </div>
    </LandingPageLayout>
  );
}

export default TermsOfService;
