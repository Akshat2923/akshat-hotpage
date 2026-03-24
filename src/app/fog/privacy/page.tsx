import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fog — Privacy Policy",
  description: "Privacy Policy for the Fog app.",
};

export default function FogPrivacyPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-1">
        <H1>Privacy Policy</H1>
        <p className="text-sm text-muted-foreground">
          Fog — Last updated: March 23, 2026
        </p>
      </div>

      <p className="text-muted-foreground">
        Fog is a personal notes app built with your privacy in mind. This
        policy explains what data Fog collects, how it&apos;s used, and your
        rights. The short version:{" "}
        <strong>
          Fog doesn&apos;t collect, transmit, or share your personal data.
          Everything stays on your device.
        </strong>
      </p>

      <div className="space-y-2">
        <H2>Who I Am</H2>
        <p className="text-muted-foreground">
          Fog is an independently developed app. If you have any questions
          about this policy, you can reach me at:{" "}
          <a
            href="mailto:akshatcanbuild@gmail.com"
            className="text-primary hover:underline"
          >
            akshatcanbuild@gmail.com
          </a>
        </p>
      </div>

      <div className="space-y-2">
        <H2>What Data Fog Collects</H2>
        <p className="font-semibold">None.</p>
        <p className="text-muted-foreground">
          Fog does not collect any personal information. Your notes, the smart
          collections they&apos;re organized into (Clouds), and any other
          content you create in the app are stored exclusively on your device
          using Apple&apos;s SwiftData framework. This data never leaves your
          device.
        </p>
      </div>

      <div className="space-y-2">
        <H2>On-Device AI Processing</H2>
        <p className="text-muted-foreground">
          Fog uses Apple&apos;s Foundation Models framework to automatically
          organize your notes. All AI processing happens entirely on your
          device — no data is sent to any server, including mine, Apple&apos;s,
          or any third party&apos;s. The model runs locally and works fully
          offline.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Third-Party Services</H2>
        <p className="text-muted-foreground">
          Fog does not use any third-party analytics, advertising, tracking
          SDKs, or crash reporting services. There are no third parties
          receiving your data.
        </p>
      </div>

      <div className="space-y-2">
        <H2>iCloud &amp; CloudKit Sync</H2>
        <p className="text-muted-foreground">
          Fog uses Apple&apos;s CloudKit to sync your notes across your
          personal devices. This sync happens entirely within your iCloud
          account — your data is only accessible to you and is governed by
          Apple&apos;s iCloud privacy policy. I have no access to your CloudKit
          data at any point. CloudKit sync is a first-party Apple service and
          is subject to the same privacy and security standards as the rest of
          iCloud.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Sharing</H2>
        <p className="text-muted-foreground">
          I do not sell, rent, trade, or share your data with anyone — because
          I don&apos;t have it. No data leaves your device.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Retention and Deletion</H2>
        <p className="text-muted-foreground">
          All your data lives on your device. You can delete your notes at any
          time within the app. To delete all Fog data, simply delete the app
          from your device. Because no data is stored remotely, there is
          nothing for me to delete on my end.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Children&apos;s Privacy</H2>
        <p className="text-muted-foreground">
          Fog does not knowingly collect data from anyone, including children
          under 13. Because no data is collected at all, Fog is safe for users
          of all ages from a data privacy standpoint.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Changes to This Policy</H2>
        <p className="text-muted-foreground">
          If I make changes to this privacy policy, I&apos;ll update the date
          at the top of this page. Because Fog doesn&apos;t collect your
          contact information, I can&apos;t notify you directly — but the
          latest version will always be available at this URL.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Contact</H2>
        <p className="text-muted-foreground">
          Questions about this policy? Reach me at:{" "}
          <a
            href="mailto:akshatcanbuild@gmail.com"
            className="text-primary hover:underline"
          >
            akshatcanbuild@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
