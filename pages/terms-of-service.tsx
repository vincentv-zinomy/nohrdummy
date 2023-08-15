import Link from 'next/link';
import React from 'react';

function TermsOfService() {
  return (
    <div>
      <section className='bg-[#f7f9fb] pt-40  lg:flex lg:h-5/6 lg:flex-row lg:items-center'>
        <div className='flex-1 '>
          <h1 className='py-4 text-center text-4xl font-bold'>
            Terms & Conditions
          </h1>

          <div>
            <div>
              {' '}
              Please read these terms and conditions ("terms and conditions",
              "terms") carefully before using leadfix.ai website (“website”,
              "service") operated by Adeptle Technologies Pvt. Ltd. ("us", 'we",
              "our").{' '}
              <h2 className='text-left text-2xl font-bold'>
                Conditions of use
              </h2>
              By using this website, you certify that you have read and reviewed
              this Agreement and that you agree to comply with its terms. If you
              do not want to be bound by the terms of this Agreement, you are
              advised to leave the website accordingly. Adeptle Technologies
              Pvt. Ltd only grants use and access of this website, its products,
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
              Adeptle Technologies Pvt. Ltd. is not liable for any damages that
              may occur to you as a result of your use of our website. Adeptle
              Technologies Pvt. Ltd. reserves the right to edit, modify, and
              change this Agreement at any time.This Agreement is an
              understanding between Adeptle Technologies Pvt. Ltd. and the user,
              and this supersedes and replaces all prior agreements regarding
              the use of this website.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService;
