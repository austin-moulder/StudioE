import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Studio E - Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-montserrat mb-8 text-center">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <p>
          Welcome to the website of Studio E, Inc. (doing business as Studio E), and its subsidiaries, affiliated brands, and affiliated companies, ("<strong>Studio E</strong>," "<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"). Studio E created the website at https://joinstudioe.com/, as it may be modified, relocated, and/or redirected from time to time (the "<strong>Site</strong>"), and associated mobile applications (the "<strong>App</strong>") (the Site and App together are the "<strong>Platform</strong>") to provide information about Studio E, to facilitate the provision of dance instruction services (the "<strong>Professional Services</strong>") by independent dance instructors ("<strong>Instructors</strong>"), and to provide Studio E's matching and related services for the Professional Services (collectively, the "<strong>Services</strong>").
        </p>
        
        <p>
          Please read this Privacy Policy carefully so that you understand how we treat your information. By using any of our Services, or otherwise taking an affirmative action of agreement, you confirm that you have read, understood, and agree to this Privacy Policy. If you do not agree to this Privacy Policy, please do not use any of the Services. If you have any queries, please email us at studioelatindance@gmail.com.
        </p>
        
        <p className="font-bold">
          Applicability to Instructors: Please note that this Privacy Policy applies to Instructors only to the extent that they are residents of California. Otherwise, if you are an Instructor who resides in another state, this Privacy Policy does not apply.
        </p>
        
        <p className="font-bold">
          Assistance for the Disabled: Alternative formats of this Privacy Policy are available to individuals with a disability. Please contact studioelatindance@gmail.com for assistance.
        </p>
        
        <p>
          Other websites: The Platform may contain links to websites and services not operated or controlled by Studio E ("<strong>Third Party Sites</strong>"). The policies and procedures we described here do not apply to Third Party Sites. The links from the Platform do not imply that Studio E endorses or has reviewed the Third Party Sites. We suggest contacting those websites and services directly for information on their privacy policies.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">This Privacy Policy explains:</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Whose information we collect</li>
          <li>Information we collect about you</li>
          <li>Sources from which we collect your personal information</li>
          <li>Purposes for which we use your personal information</li>
          <li>How we may disclose your personal information</li>
          <li>How We Respond to 'Do Not Track' & Other Signals</li>
          <li>Cookies</li>
          <li>Privacy rights & Additional Disclosures for Certain U.S. Residents</li>
          <li>Change of Control</li>
          <li>Children's Privacy</li>
          <li>Data Retention and Security</li>
          <li>Changes to this Privacy Policy</li>
          <li>Contact Information</li>
        </ol>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Whose Information We Collect</h2>
        <p>
          Studio E obtains information from various individuals and entities. These individuals and entities are defined below by what they are referred to in this Privacy Policy and when their information is collected. Entities may overlap and are not exclusive categories.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Website Visitors:</strong> When you visit this website or contact us directly for information.</li>
          <li><strong>Customers:</strong> When you review, book, and receive Professional Services through the Platform and Services.</li>
          <li><strong>Instructors:</strong> When you, as a resident of California, use our Site to become an independent contractor to provide Professional Services.</li>
          <li><strong>Vendors:</strong> When you become a vendor to Studio E.</li>
        </ul>
        <p>
          The use of "you" and "your(s)" throughout this Privacy Policy will, depending on the context, refer to a Studio E Website Visitor, Customer, or Instructor.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect About You</h2>
        <p className="font-bold">Information You Give Us:</p>
        <p>
          You may give us information by signing up for an online account, entering information through our online forms or surveys, inputting information while using our Services, contacting us by phone or email for information or customer services.
        </p>
        
        <p>The categories of information include:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Identifiers</strong>, for example: real name, telephone number, postal address, e-mail address, social security number, date of birth, and similar information.</li>
          <li><strong>Categories of personal information under California law</strong>, for example: name, signature, postal address, telephone number, employment, bank account number, credit card number, debit card number, or any other financial information.</li>
          <li><strong>Characteristics of protected classifications under state or federal law</strong>, for example: demographic data about you, including data collected through surveys. This may include gender, age, and other information.</li>
          <li><strong>Commercial Information</strong>, for example: records of products or services purchased, purchasing or consuming histories or tendencies including information about your dance preferences (e.g., styles, level, special requirements, etc.) that you give us for purposes of obtaining Professional Services and metrics information about when and how you use the Services.</li>
          <li><strong>Internet or Other Network Activity Information</strong>, for example: interactions with our Platform, including browsing history and search history, device data, browser information, operating system characteristics, Internet service provider and IP address.</li>
          <li><strong>Geolocation data</strong>, for example: determining the distance between an Instructor and a Customer for scheduling purposes.</li>
          <li><strong>Audio, electronic, or visual data</strong>, for example: video or audio recordings you submit when you contact customer support, provide ratings, or otherwise contact Studio E. This may include feedback, photographs, or recordings you might create, including user video recordings submitted for research purposes.</li>
          <li><strong>Professional or employment-related information</strong>, for example: We have collected employment-related information from Instructors.</li>
          <li><strong>Inferences drawn from above categories of information:</strong> We may draw inferences about you from other personal information we collect. For example, we might infer based on your use of a regular dance class service at a previous time that you would be interested in a similar class service at a new time.</li>
        </ul>
        
        <p>The categories of sensitive personal information include:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Social security number</strong>.</li>
          <li><strong>Account log-in</strong>, in combination with any required security or access code, password, or credentials allowing access to the account.</li>
          <li><strong>Precise geolocation data</strong>, for example: to accurately suggest Instructors near a Customer's location.</li>
          <li><strong>Contents of communications:</strong> During our communications with you, we collect the content of these communications as well as metadata about the communications, for example: date and time of the call or text (SMS or MMS) message and phone numbers. The contents of email and text messages are considered sensitive information, unless we are the intended recipient of the communication.</li>
        </ul>
        
        <p className="font-bold">Information We Automatically Collect:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Sites:</strong> Like many website operators, we collect information that your browser sends whenever you visit our Sites. This includes log data, such as your computer's IP address, browser type, browser version, the pages of our Sites that you visit, the time and date of your visit, the time spent on those pages and other statistics, and whether you reached our page via a social media or email campaign. This information may be collected via several technologies, including cookies, web beacons, clear GIFs, canvas fingerprinting and other means, such as Google Remarketing and Facebook Pixel. You can control cookies in your browser to enable or disable them.</li>
          <li><strong>Devices:</strong> Some of our devices will collect IP address, log-in credentials, connectivity details and locations. This is used for device control and management.</li>
        </ul>
        
        <p className="font-bold">Information We Collect From Third Parties:</p>
        <p>
          If you access our Site through third parties (e.g., Facebook or Google), or if you share content from our Site to a third-party social media service, the third-party service will send us certain information about you if the third-party service and your account settings allow such sharing. The information we receive will depend on the policies and your account settings with the third-party service.
        </p>
        
        <p className="font-bold">Background Check Information (Instructors).</p>
        <p>
          This includes information submitted during the Instructor application process, such as known aliases, prior addresses, and right to work. The information may be collected by our service providers.
        </p>
        
        <p className="font-bold">Payment Card Information:</p>
        <p>
          Although users can submit credit card or other payment card information to pay for Services through the Platform, Studio E does not store this information itself. Payment card information is securely transmitted to a third-party payment card processor. The processor then communicates to Studio E whether your payment has cleared, and provides a secure payment token, but does not provide payment card information to Studio E.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">3. Sources From Which We Collect Your Personal Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>You:</strong> Studio E collects personal information from the individual him/herself, as voluntarily provided by that individual, via the Platform, in person, or through forms and surveys embedded in the Platform.</li>
          <li><strong>Automated Technologies:</strong> Studio E also collects Internet Activity Information through automated technologies on the Platform (e.g., cookies).</li>
          <li><strong>Government:</strong> Studio E may receive personal information from law enforcement officials, public health officials, and other government authorities.</li>
          <li><strong>Google, Facebook, and Other Companies:</strong> Studio E may receive personal information, for example, from social media platforms, consumer research companies, and analytics or marketing/advertising companies.</li>
          <li><strong>Affiliated Brands:</strong> Studio E may receive personal information from other entities within the Studio E, Inc. family of brands.</li>
          <li><strong>Public Internet Sources:</strong> Studio E may collect personal information about you from internet sources such as public databases.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">4. Purposes For Which We Use Your Personal Information</h2>
        <p>
          We use your personal information for the following commercial and business purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide our Services, including to process and fulfill your requests for dance instruction services.</li>
          <li>To identify you when you contact or otherwise engage with us.</li>
          <li>To send you transactional information, such as service details, reminders, advertisements, confirmations, and other service-related information.</li>
          <li>To detect, investigate, and prevent activities that may violate our policies or be illegal.</li>
          <li>To perform accounting, auditing, and other recordkeeping functions.</li>
          <li>To enforce or apply our Terms of Service and other agreements.</li>
          <li>To maintain the safety, functionality, and security of our Services and website.</li>
          <li>To debug to identify and repair errors in our systems.</li>
          <li>For short-term, transient use, such as non-personalized advertising shown as part of our current interactions.</li>
          <li>To aggregate personal information in a manner that is no longer personally identifiable for analysis, research, and optimization of our Services.</li>
          <li>To improve and evaluate our current Services, develop new ones, and build user profiles.</li>
          <li>To conduct customer surveys and other user and market research to improve our Services.</li>
          <li>To recruit new Instructors (as applicable).</li>
          <li>To comply with applicable laws and regulations.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">5. How We May Disclose Your Personal Information</h2>
        <p>
          We disclose information to the following categories of third parties:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Service providers:</strong> Such as those who provide us with services including (but not limited to) payment processing, delivery, IT, customer service, marketing, analytics, and auditing, as necessary for them to perform those services.</li>
          <li><strong>Customer management platforms:</strong> We use customer relationship management tools to organize, automate, and synchronize our sales, marketing, customer service, and technical support.</li>
          <li><strong>Commercial partners:</strong> We may share personal information with third parties with whom we have a commercial relationship so that they may offer services that might be of interest to you.</li>
          <li><strong>Third parties with your consent:</strong> We may share your personal information with other third parties with your specific consent to do so.</li>
          <li><strong>For legal purposes:</strong> We may disclose information to legal, regulatory, or administrative authorities as required by law. We may also disclose information in response to a subpoena, court order, or other legal process.</li>
          <li><strong>Protection of rights:</strong> We may disclose information where we believe it necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violations of our Terms of Service, or as evidence in litigation.</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">6. How We Respond to 'Do Not Track' & Other Signals</h2>
        <p>
          We treat your browser's "do not track" signals and other similar mechanisms in accordance with our Cookie Policy and the applicable laws and regulations of your location. Depending on your location, you may be able to opt out of certain types of tracking technologies.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies</h2>
        <p>
          Like many websites, we use "cookies" to collect information. A cookie is a small data file that we transfer to your computer's hard disk for record-keeping purposes. We use cookies for a number of purposes, such as remembering your preferences, tracking your use of our website, and targeting ads to you.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website effectively.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">8. Privacy Rights & Additional Disclosures for Certain U.S. Residents</h2>
        <p>
          Several jurisdictions grant state residents certain rights and disclosures. We provide the following information to further help you understand your potential privacy rights.
        </p>
        
        <p className="font-bold">Right to Know and Portability:</p>
        <p>
          You may have the right to submit a verifiable request for specific pieces of your personal information collected in the preceding 12 months and for information about Studio E's collection, use, and disclosure of your personal information during that same 12-month time period. If the information is available in a digital format, you may have a right to obtain a copy of your personal information that you previously provided in a portable and, to the extent technically feasible, readily usable format that allows you to transmit the information without hindrance. In addition, you may have a right to confirm whether Studio E is processing your personal information and a right to know the categories of your personal information that Studio E sold or shared for cross-context behavioral advertising and the parties to which those categories were sold or shared.
        </p>
        
        <p className="font-bold">Right to Delete:</p>
        <p>
          You may have the right to submit a verifiable request for the deletion of personal information that you have provided to Studio E.
        </p>
        
        <p className="font-bold">Right to Correct:</p>
        <p>
          You may have the right to submit a verifiable request for the correction of inaccurate personal information maintained by Studio E, taking into account the nature of the personal information and the purposes of processing the personal information.
        </p>
        
        <p className="font-bold">Right to Opt Out of Sales and Sharing:</p>
        <p>
          Residents of certain U.S. states may have the right to opt out of having their personal information sold or shared for targeted advertising by clicking the Do Not Sell or Share My Personal Information link at the bottom of our website and selecting your preferences. You can also submit a request by sending an email to studioelatindance@gmail.com.
        </p>
        <p>
          You may additionally implement a browser setting or extension to communicate your selling and sharing preferences automatically to the websites you visit. We honor your right to opt out of the sale and sharing of your personal information as signaled by a universal opt out signal or Global Privacy Control ("GPC"). To enable GPC, you can visit the Global Privacy Control page at https://globalprivacycontrol.org/orgs. If you download a supported browser or extension and exercise your privacy rights with GPC, we will turn off certain third-party cookies on our Site after our Site detects a GPC signal. However, if you visit our Site from a different device or from a different browser on the same device, you will need to opt-out or use an opt-out preference signal for that browser and/or device.
        </p>
        
        <p className="font-bold">How to Exercise Your Rights:</p>
        <p>
          Except for opt-out rights, which are described in the applicable subsection above, you can submit requests to exercise your rights in the following ways:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Email studioelatindance@gmail.com</li>
          <li>Contact us through our website form</li>
        </ul>
        
        <p className="font-bold">How We Will Verify Your Request:</p>
        <p>
          If you submit a request through an adequately secure password-protected account that you created before the date of your request, we will use the authentication mechanisms in the account to verify your identity. Otherwise, we match personal information that you provide us against personal information we maintain in our files. The more risk entailed by the request (e.g., a request for specific pieces of personal information), the more items of personal information we may request to verify your identity. If we cannot verify your identity to a sufficient level of certainty to respond securely to your request, we will let you know promptly and explain why we cannot verify your identity.
        </p>
        
        <p className="font-bold">Authorized Agents:</p>
        <p>
          If an authorized agent submits a request to know or delete on your behalf, the authorized agent must submit with the request either (a) a power of attorney that is valid under applicable law, or (b) a document signed by you that authorizes the authorized agent to submit the request on your behalf. In addition, we may ask you or your authorized agent to follow the applicable process described above for verifying your identity. You can obtain "Authorized Agent Designation" form by contacting us at studioelatindance@gmail.com.
        </p>
        
        <p className="font-bold">Appeal Process:</p>
        <p>
          If we do not decide to act in response to your request to exercise a right, we will provide a timely response detailing the reasons for not taking the action and, depending on your jurisdiction, any rights that you may have to appeal our decision.
        </p>
        
        <p className="font-bold">Non-Discrimination:</p>
        <p>
          Studio E will not unlawfully discriminate against you for exercising your privacy rights.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">9. Change of Control</h2>
        <p>
          Personal information may be transferred to a third party because of a sale, acquisition, merger, reorganization, or other change in control. If we sell, merge, or transfer any part of the business, part of the sale may include your personal information.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">10. Children's Privacy</h2>
        <p>
          We do not knowingly collect any information from anyone under 16 years of age, and our Services are directed to people who are at least 16 years old or older. If you are under the age of 16, you are not authorized to use the Platform. If you become aware that a child has provided us with personal information, please contact us using the contact details at the end of this Privacy Policy. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">11. Data Retention and Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. However, no website, application, or transmission can guarantee security. Thus, while we have established and maintain what we believe to be appropriate technical and organizational measures to protect the confidentiality, security, and integrity of personal information obtained through the Platform, we cannot ensure or warrant the security of any information you transmit to us.
        </p>
        <p>
          We retain information from or about you for so long as necessary to fulfill the purposes outlined in this Privacy Policy. When the information is no longer necessary for these purposes, we delete it or keep it in a form that does not identify you, unless we are required by law to keep this information for a longer period. When determining the retention period, we take into account various criteria, such as the type of products and services requested by or provided to you, the nature and length of our relationship with you, possible re-enrollment with our products or services, the impact on the services we provide to you if we delete some information from or about you, mandatory retention periods provided by law and the statute of limitations.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to this Privacy Policy</h2>
        <p>
          If we change this Privacy Policy, we will post those changes on this page and update the Privacy Policy modification date above. If we materially change this Privacy Policy in a way that affects how we use or disclose your personal information, we will provide a prominent notice of such changes and the effective date of the changes before making them.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Information</h2>
        <p>
          For questions or concerns about Studio E's privacy policies and practices, please contact us at studioelatindance@gmail.com.
        </p>
        
        <p className="mt-12 text-center text-gray-500 text-sm">
          © Studio E 2023-{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
} 