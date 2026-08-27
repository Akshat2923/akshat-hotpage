import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoomie — Privacy Policy",
  description: "Privacy Policy for the Zoomie app.",
};

export default function ZoomiePrivacyPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-1">
        <H1>Privacy Policy</H1>
        <p className="text-sm text-muted-foreground">
          Zoomie — Last updated: August 26, 2026
        </p>
      </div>

      <p className="text-muted-foreground">
        Zoomie is a dog activity app built with your privacy in mind. This
        policy explains what data Zoomie uses, how it is processed, and how it
        is stored. The short version: Zoomie does not collect, sell, or share
        your personal data with third parties. Your Zoomie data is stored on
        your device and, if iCloud sync is enabled, securely synced across
        your personal Apple devices through Apple&apos;s CloudKit service.
      </p>

      <div className="space-y-2">
        <H2>Who I Am</H2>
        <p className="text-muted-foreground">
          Zoomie is an independently developed app. If you have any questions
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
        <H2>What Data Zoomie Uses</H2>
        <p className="text-muted-foreground">
          Zoomie uses information you provide or create while using the app,
          including dog profiles and names, dog activity and progress, Paws,
          Playtime and Wags activity, Treats and other achievements, photos you
          choose to use with Zoomie, app settings and preferences, and other
          content you create within the app.
        </p>
        <p className="text-muted-foreground">
          This information is stored locally on your device using Apple&apos;s
          SwiftData framework. Zoomie does not collect this information on
          servers operated by the developer.
        </p>
      </div>

      <div className="space-y-2">
        <H2>How Data Is Used</H2>
        <p className="text-muted-foreground">
          Your data is used to provide Zoomie&apos;s features, including
          activity rings, Playtime sessions, Wags, Treats and achievements,
          activity history, charts and heat maps, widgets, notifications,
          multiple dog profiles, and other features you choose to use.
        </p>
        <p className="text-muted-foreground">
          Zoomie does not use your data for advertising, tracking, or profiling.
        </p>
      </div>

      <div className="space-y-2">
        <H2>On-Device Processing</H2>
        <p className="text-muted-foreground">
          Zoomie performs certain processing directly on your device using
          Apple&apos;s frameworks.
        </p>
        <p className="text-muted-foreground">
          For example, the Wags feature can analyze photos you select in order
          to identify your dog&apos;s joints and enable interactive
          emoji-based activities. This processing happens on your device. The
          photos are not uploaded to a server operated by Zoomie for this
          purpose.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Apple Health</H2>
        <p className="text-muted-foreground">
          If you choose to allow Zoomie to interact with Apple Health, Zoomie
          may read or write relevant activity information through Apple&apos;s
          HealthKit framework, such as steps or walking and exercise activity,
          where supported by the app and your permissions.
        </p>
        <p className="text-muted-foreground">
          Health data is handled through Apple&apos;s HealthKit APIs and is
          subject to Apple&apos;s privacy and security protections. Zoomie
          does not sell Health data or use it for advertising.
        </p>
        <p className="text-muted-foreground">
          You control Zoomie&apos;s access to Health data through your
          device&apos;s Health permissions.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Siri &amp; App Intents</H2>
        <p className="text-muted-foreground">
          Zoomie supports Apple&apos;s App Intents and Siri features, allowing
          you to perform certain actions using Siri or system features, such as
          starting a Playtime session.
        </p>
        <p className="text-muted-foreground">
          These interactions are handled through Apple&apos;s system
          frameworks. Zoomie does not collect or store your Siri requests for
          advertising, tracking, or profiling purposes.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Live Activities &amp; Dynamic Island</H2>
        <p className="text-muted-foreground">
          Zoomie may use Apple&apos;s ActivityKit to display information about
          active Playtime sessions through Live Activities, including on the
          Lock Screen and Dynamic Island.
        </p>
        <p className="text-muted-foreground">
          Live Activity information is used to provide the requested feature
          and is not collected by the developer for advertising or tracking.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Third-Party Services</H2>
        <p className="text-muted-foreground">
          Zoomie does not use third-party analytics, advertising, tracking
          SDKs, or data-broker services.
        </p>
        <p className="text-muted-foreground">
          Zoomie does use Apple&apos;s first-party services and frameworks,
          including SwiftData, CloudKit, HealthKit, ActivityKit, App Intents,
          Siri, and other Apple system frameworks required to provide the
          app&apos;s features.
        </p>
        <p className="text-muted-foreground">
          These Apple services are governed by Apple&apos;s own privacy
          policies and security practices.
        </p>
      </div>

      <div className="space-y-2">
        <H2>iCloud &amp; Sync</H2>
        <p className="text-muted-foreground">
          Zoomie uses Apple&apos;s CloudKit to sync your Zoomie data across
          your personal Apple devices when iCloud sync is available and
          enabled.
        </p>
        <p className="text-muted-foreground">
          Your data is associated with your personal iCloud account and is
          synchronized through Apple&apos;s CloudKit infrastructure. The
          developer does not have access to your private CloudKit data.
        </p>
        <p className="text-muted-foreground">
          CloudKit is an Apple first-party service and is subject to
          Apple&apos;s privacy and security practices.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Sharing</H2>
        <p className="text-muted-foreground">
          I do not sell, rent, trade, or share your personal data with third
          parties.
        </p>
        <p className="text-muted-foreground">
          The developer does not have access to your private CloudKit data,
          HealthKit data, or other personal information stored within Zoomie.
        </p>
        <p className="text-muted-foreground">
          Apple may process data as necessary to provide its own services,
          including iCloud, CloudKit, HealthKit, Siri, and related system
          functionality, according to Apple&apos;s applicable terms and
          privacy policies.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Retention and Deletion</H2>
        <p className="text-muted-foreground">
          Your Zoomie data is stored locally on your devices and, when iCloud
          sync is enabled, within your personal iCloud account.
        </p>
        <p className="text-muted-foreground">
          You can delete dogs, activity, photos, Treats, and other content from
          within Zoomie where supported.
        </p>
        <p className="text-muted-foreground">
          Because the developer does not maintain a separate database
          containing your personal Zoomie data, I do not have a copy of your
          data that I can independently access or delete.
        </p>
        <p className="text-muted-foreground">
          You can also manage or delete iCloud data through Apple&apos;s iCloud
          and device settings.
        </p>
        <p className="text-muted-foreground">
          Deleting the Zoomie app removes its locally stored app data from your
          device. Data synchronized through iCloud may be managed separately
          through Apple&apos;s iCloud settings and services.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Children&apos;s Privacy</H2>
        <p className="text-muted-foreground">
          Zoomie does not knowingly collect personal information from anyone,
          including children under 13.
        </p>
        <p className="text-muted-foreground">
          Because Zoomie does not operate a service that collects children&apos;s
          personal information on developer-controlled servers, the developer
          does not knowingly collect or maintain personal information from
          children.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Changes to This Policy</H2>
        <p className="text-muted-foreground">
          If I make changes to this privacy policy, I&apos;ll update the date
          at the top of this page.
        </p>
        <p className="text-muted-foreground">
          The latest version will always be available at this URL.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Contact</H2>
        <p className="text-muted-foreground">
          Questions about this privacy policy? Reach me at:{" "}
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