import { classNames } from "@/lib/common"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export const faqs = [
  {
    question: 'What is NoHR.ai?',
    answer:
      'NoHR.ai is an advanced interview scheduling platform powered by AI technology. It automates and simplifies the process of coordinating interviews, saving time and effort for recruiters and candidates.',
  },
  {
    question: 'How does NoHR.ai help streamline the interview scheduling process?',
    answer:
      'NoHR.ai eliminates the manual back-and-forth communication by automating the coordination between recruiters and candidates. It suggests available time slots, sends reminders, and syncs with calendars to ensure seamless scheduling.',
  },
  {
    question: 'What communication channels does NoHR.ai integrate with?',
    answer:
      'NoHR.ai is designed to integrate with various communication platforms, including WhatsApp, SMS, and email. It allows recruiters and candidates to communicate through their preferred channels.',
  },
  {
    question: 'Does NoHR.ai support calendar integration with popular calendar platforms?',
    answer:
      'Yes, NoHR.ai seamlessly integrates with popular calendar platforms like Google Calendar and Microsoft Outlook. It synchronizes available time slots and updates the calendars of both recruiters and candidates.',
  },
  {
    question: 'How secure is the data handled by NoHR.ai?',
    answer:
      'Data security is a top priority for NoHR.ai. The platform employs robust encryption measures, follows industry-standard security protocols, and ensures compliance with data protection regulations to keep all information secure.',
  },
  {
    question: 'Can NoHR.ai handle multiple job positions and candidates simultaneously?',
    answer:
      'Yes, NoHR.ai is designed to handle multiple job positions and candidates concurrently. It can efficiently manage scheduling for different positions and candidates, keeping everything organized in one centralized platform..',
  },
  {
    question: 'Is NoHR.ai suitable for businesses or recruitment agencies?',
    answer:
      'NoHR.ai caters to the needs of both businesses and recruitment agencies. Its organizational features and flexible configuration make it adaptable to the recruitment processes of organizations of all sizes and forms.',
  },
  {
    question: 'Can NoHR.ai assist in coordinating interviews with multiple interviewers and candidates?',
    answer: 'NoHR.ai simplifies the coordination of interviews with multiple interviewers and candidates. It finds common available interview slots amongst all the interviewers and suggests available time slots, ensuring a smooth and efficient interview scheduling process. NoHR.ai detects scheduling conflicts and proactively offers alternative time slots based on the availability of the interviewers and candidates. It helps in resolving conflicts and ensures that interviews are successfully scheduled.'
  },
  {
    question: 'Can you create a Custom plan for me, since my volume needs are different?',
    answer: 'Sure, please reach out to us at support@noHR.ai and we would be happy to propose a custom plan for you'
  },
  {
    question: 'What kind of support and customer service is available for NoHR.ai users?',
    answer: 'NoHR.ai offers dedicated customer support to assist users with any queries or issues they may encounter. We provide timely assistance through various channels like email, chat, or phone'
  }

]

export default function FAQSection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
