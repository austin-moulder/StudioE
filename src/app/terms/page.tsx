import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Studio E - Terms of Service and Conditions',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-montserrat mb-8 text-center">Terms & Conditions</h1>
      
      <div className="prose prose-lg max-w-none">
        <p>
          The terms and conditions stated herein (collectively, this "Agreement") constitute a legal agreement between you and Studio E, Inc., a Delaware corporation or the appropriate entity (the "Company"). By using or receiving any services supplied to you by the Company (together with the website located at https://joinstudioe.com, collectively, the "Service"), and downloading, installing or using any associated software supplied by the Company which purpose is to enable you to use the Service (collectively, the "Software"), you hereby expressly acknowledge and agree to be bound by the terms and conditions of this Agreement, and any future amendments and additions to this Agreement as published from time to time at https://joinstudioe.com/terms or through the Service.
        </p>
        
        <p>
          The Company reserves the right to modify the terms and conditions of this Agreement or its policies relating to the Service or Software at any time, effective upon posting of an updated version of this Agreement on the Service or Software. You are responsible for regularly reviewing this Agreement. Continued use of the Service or Software after any such changes shall constitute your consent to such changes. If you require any more information or have any questions about our Terms and Conditions, please feel free to contact us by email at studioelatindance@gmail.com.
        </p>
        
        <p className="font-bold">
          THE COMPANY DOES NOT PROVIDE DANCE INSTRUCTION SERVICES, AND THE COMPANY IS NOT A DANCE INSTRUCTION SERVICE PROVIDER. IT IS UP TO THE THIRD PARTY DANCE INSTRUCTORS TO OFFER DANCE INSTRUCTION SERVICES WHICH MAY BE SCHEDULED THROUGH USE OF THE SOFTWARE OR SERVICE. THE COMPANY OFFERS INFORMATION AND A METHOD TO OBTAIN SUCH THIRD PARTY DANCE INSTRUCTION SERVICES, BUT DOES NOT AND DOES NOT INTEND TO PROVIDE DANCE INSTRUCTION SERVICES OR ACT IN ANY WAY AS A DANCE INSTRUCTION SERVICE PROVIDER, AND HAS NO RESPONSIBILITY OR LIABILITY FOR ANY DANCE INSTRUCTION SERVICES PROVIDED TO YOU BY SUCH THIRD PARTIES.
        </p>
        
        <p className="font-bold">
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST COMPANY ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE ABLE TO HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A COURT OF LAW.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Payment Terms</h2>
        <p>
          Any fees which the Company may charge you for the Software or Service are due immediately upon completion of your dance instruction session and are non-refundable. The Company reserves the right to determine final prevailing pricing - Please note the pricing information published on the website may not reflect the prevailing pricing.
        </p>
        
        <p>
          The Company, at its sole discretion, may make promotional offers with different features and different rates to any of our customers. These promotional offers, unless made to you, shall have no bearing whatsoever on your offer or contract. You may be charged $40 if you cancel within 6 hours of the appointment start subject to our Last Minute Cancellation Policy. If your instructor is unable to conduct the session as a result of being unable to access the specified location or venue, you may be charged for your appointment in full. Please see our Help Center for Last Minute Cancellation Policy and No-Show Policy. The Company may change the fees for our Service as we deem necessary for our business. We encourage you to check back at our website periodically if you are interested about how we charge for the Service.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Premium Membership Autorenewal and Cancellation Terms</h2>
        <p className="font-bold">AUTORENEWAL TERMS:</p>
        <p>
          Premium memberships will automatically renew on a monthly basis and your credit or debit card will be charged your monthly membership fee (taxes may apply) unless you cancel prior to your next billing cycle. Membership fees are due immediately upon renewal and are non-refundable. Thus, if you cancel after your membership is renewed, you will be charged for the entire month regardless of when you cancel your Premium membership.
        </p>
        
        <p className="font-bold">CANCELLATION TERMS:</p>
        <p>
          Premium memberships can be canceled anytime online under your 'Account Settings' or by submitting a help ticket at our help center. However, canceling your Premium membership before your initial commitment term will result in your first instruction session being charged at full price at standard rates ("early termination fee"). For avoidance of doubt, the early termination fee is calculated as the difference between the full price of your first session at standard rates and the discounted price of your first session (taxes may apply).
        </p>
        
        <p>
          The "no refund policy" discussed in this section shall apply at all times regardless of your decision to terminate your usage, the Company's decision to terminate your usage, disruption caused to our Software or Service either planned, accidental or intentional, or any reason whatsoever.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Damage and Injury Policy</h2>
        <p>
          In the event of potential damage to property or injury during your dance instruction service, the requestor must first reach out to their Service Provider. As a Studio E customer, you have the option to request the platform to help mediate a resolution between the requestor and the Service Provider within 30 days of the completion of your requested service. You will receive a confirmation email, and by requesting that Studio E help mediate a resolution, you agree that Studio E's decision is final and binding. In the event that you choose to involve Studio E, you must complete the damage and injury claim form within 30 days of receiving the form.
        </p>
        
        <p>
          A requester will only be covered by our Damage and Injury Policy provided all of the below:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>the requested service is paid in full through the platform;</li>
          <li>the requester has not violated the Terms of Service;</li>
          <li>the requester has reported the claim within 30 days of the Service Provider's completion of the requested service;</li>
          <li>the requestor has accounted for & secured the venue space appropriately prior to the start of the requested service.</li>
        </ul>
        
        <p>
          Below are the exclusions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>any instruction service that is not booked and paid directly on the platform;</li>
          <li>injuries or damages that have already been addressed by the instructor or covered by insurance;</li>
          <li>injuries or damages arising from the acts or omissions of a requester or the Service Provider;</li>
          <li>injuries or damages arising from the negligence or misconduct of a third party;</li>
          <li>injuries or damages involving products/services, or uses of either that are prohibited by law;</li>
          <li>injuries or damages related to services not explicitly booked through the platform;</li>
        </ul>
        
        <p>
          As part of Studio E's resolution process, we will help gather information and coordinate communication between the requestor and the Service Provider. Once we receive sufficient information from both you and your instructor, we'll review all documentation and, if applicable, determine an appropriate resolution. Most resolutions are reached within one week, with the length of the resolution process varying depending on the severity of the case, the quality of documentation, and the cooperation of the requestor and instructor.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Studio E is Only a Venue</h2>
        <p>
          The Service is a communications platform for enabling the connection between individuals seeking to obtain dance instruction services and/or individuals seeking to provide dance instruction services and for facilitating a contractual relationship between such parties. The Company verifies the credentials of dance instruction service providers; however, the Company does not guarantee or warrant, and makes no representations regarding, the reliability, quality or suitability of such dance instruction service providers. When interacting with dance instruction service providers you should exercise caution and common sense to protect your personal safety and property, just as you would when interacting with other persons whom you don't know. By using the Service, you agree to hold the Company free from the responsibility for any liability or damage that might arise out of the transactions involved.
        </p>
        
        <p>
          NEITHER THE COMPANY NOR ITS AFFILIATES OR LICENSORS IS RESPONSIBLE FOR THE CONDUCT, WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE SERVICE OR SOFTWARE. MOREOVER, NEITHER THE COMPANY NOR ITS AFFILIATES OR LICENSORS IS RESPONSIBLE FOR ANY DEFICIENT DANCE INSTRUCTION SERVICES PROVIDED BY DANCE INSTRUCTION SERVICE PROVIDERS. THE COMPANY AND ITS AFFILIATES AND LICENSORS EXPRESSLY DISCLAIM ALL LIABILITY IN CONNECTION WITH DANCE INSTRUCTION SERVICES PROVIDED BY DANCE INSTRUCTION SERVICE PROVIDERS AND THE ACTS OR OMISSIONS OF ANY USERS OF OUR SOFTWARE OR SERVICE, AND YOU ALONE ARE RESPONSIBLE FOR YOUR INTERACTIONS WITH ALL OTHER USERS. THE SERVICE AND SOFTWARE ARE PROVIDED "AS IS" AND "AS AVAILABLE."
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Dispute Resolution by Binding Arbitration</h2>
        <p>
          PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS. YOUR CONTINUED USE OF OUR SERVICE OR SOFTWARE INDICATES YOUR AGREEMENT TO BE BOUND BY THE ARBITRATION AGREEMENT. Any election to arbitrate by one party will be final and binding on the other. YOU UNDERSTAND THAT BY USING THE SOFTWARE OR SERVICE AND AGREEING TO THESE TERMS AND CONDITIONS, YOU AND COMPANY ARE EACH WAIVING THE RIGHT TO SUE IN COURT, THE RIGHT TO A TRIAL BY JURY, AND THE RIGHT TO PARTICIPATE IN A CLASS ACTION. Your rights will be determined by a neutral arbitrator, not a judge or jury. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement.
        </p>
        
        <p>
          The arbitration will be commenced and conducted under the Commercial Arbitration Rules (the "AAA Rules") of the American Arbitration Association ("AAA") and, where appropriate, the AAA's Supplementary Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the AAA website www.adr.org. Your arbitration fees and your share of arbitrator compensation will be governed by the AAA Rules (and, where appropriate, limited by the AAA Consumer Rules). If your claim for damages does not exceed $10,000, the Company will pay all such fees unless the arbitrator finds that either the substance of your claim or the relief sought in your Demand for Arbitration was frivolous or was brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)). The arbitration may be conducted in person, through the submission of documents, by phone or remotely online or by video. The arbitrator will make a decision in writing, but need not provide a statement of reasons unless requested by a party. The arbitrator must follow applicable law, and any award may be challenged if the arbitrator fails to do so. Except as otherwise provided in this Agreement, you and the Company may litigate in court to compel arbitration, stay proceeding pending arbitration, or to confirm, modify, vacate or enter judgment on the award entered by the arbitrator.
        </p>
        
        <p className="font-bold">EXCEPTIONS TO ALTERNATIVE DISPUTE RESOLUTION.</p>
        <p>
          Each party retains the right to bring an individual action in small claims court or to seek injunctive or other equitable relief on an individual basis in a federal or state court in Santa Clara County, California, with respect to any dispute related to the actual or threatened infringement, misappropriation or violation of a party's intellectual property or proprietary rights.
        </p>
        
        <p className="font-bold">WAIVER OF RIGHT TO BE A PLAINTIFF OR CLASS MEMBER IN A PURPORTED CLASS ACTION OR REPRESENTATIVE PROCEEDING.</p>
        <p>
          You and the Company agree that any arbitration will be limited to the Dispute between the Company and you individually. YOU ACKNOWLEDGE AND AGREE THAT YOU AND THE COMPANY ARE EACH WAIVING THE RIGHT TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION OR REPRESENTATIVE PROCEEDING. Further, unless both you and the Company otherwise agree, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of any class or representative proceeding. If this specific paragraph is held unenforceable, then the entirety of this "Dispute Resolution" Section will be deemed null and void. The arbitrator may award relief (including monetary, injunctive, and declaratory relief) only in favor of the individual party seeking relief and only to the extent necessary to provide relief necessitated by that party's individual claim(s), except that you may pursue a claim for and the arbitrator may award public injunctive relief under applicable law only to the extent required for the enforceability of this provision.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
        <p>
          You and the Company agree that, other than as set forth under the subsection entitled "Waiver Of Right To Be A Plaintiff Or Class Member In A Purported Class Action Or Representative Proceeding" above, if any portion of the section entitled "Dispute Resolution" is found illegal or unenforceable, that portion will be severed and the remainder of the section will be given full force and effect. Notwithstanding the foregoing, if the subsection entitled "Exceptions to Alternative Dispute Resolution" above is found to be illegal or unenforceable, neither you nor the Company will elect to arbitrate any Dispute falling within that portion of that subsection that is found to be illegal or unenforceable and such Dispute will be decided by a court of competent jurisdiction within Santa Clara, California, and you and the Company agree to submit to the personal jurisdiction of that court.
        </p>
        
        <p>
          Except as expressly provided otherwise, this Agreement will be is governed by, and will be construed under, the laws of the State of California, without regard to choice of law principles.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Assignment</h2>
        <p>
          This Agreement may not be assigned by you without the prior written approval of the Company but may be assigned without your consent by the Company to (i) a parent or subsidiary, (ii) an acquirer of assets, or (iii) any other successor or acquirer. Any purported assignment in violation of this section shall be void.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">General</h2>
        <p>
          No joint venture, partnership, employment, or agency relationship exists between you, the Company or any third party provider as a result of this Agreement or use of the Service or Software. If any provision of the Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law. The failure of the Company to enforce any right or provision in this Agreement shall not constitute a waiver of such right or provision unless acknowledged and agreed to by the Company in writing. This Agreement comprises the entire agreement between you and the Company and supersedes all prior or contemporaneous negotiations, discussions or agreements, whether written or oral, between you and the Company regarding the subject matter contained herein.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Other Parties</h2>
        <p>
          You accept that, as a corporation, the Company has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against the Company's officers or employees in respect of any losses you suffer in connection with the Service or Software. Without prejudice to the foregoing, you agree that the limitations of warranties and liability set out in this Agreement will protect the Company's officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as the Company.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Breaches of these terms and conditions</h2>
        <p>
          Without prejudice to the Company's other rights under these terms and conditions, if you breach these terms and conditions in any way, the Company may take such action as the Company deems appropriate to deal with the breach, including suspending your access to the Service or Software, prohibiting you from accessing the Service or Software, blocking computers using your IP address from accessing the Service or Software, contacting your internet service provider to request that they block your access to the Service or Software and/or bringing court proceedings against you.
        </p>
        
        <p className="mt-12 text-center text-gray-500 text-sm">
          © Studio E 2023-{new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
} 