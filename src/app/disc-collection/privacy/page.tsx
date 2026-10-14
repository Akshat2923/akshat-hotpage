import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disc Collection — Privacy Policy",
  description: "Privacy Policy for the Disc Collection app.",
};

function Email() {
  return (
    <a href="mailto:akshatcanbuild@gmail.com" className="text-primary hover:underline">
      akshatcanbuild@gmail.com
    </a>
  );
}

export default function DiscCollectionPrivacyPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-1">
        <H1>Privacy Policy</H1>
        <p className="text-sm text-muted-foreground">
          Disc Collection — Last updated: October 8, 2026
        </p>
      </div>

      <p className="text-muted-foreground">
        Disc Collection turns photos of your games and movies into 3D cases and
        keeps a log of your collection. This policy explains what data the app
        uses, where it is stored, and what becomes public if you choose to
        display a case in the Gallery. The short version: your collection is
        stored on your device and in your own iCloud account. There are no
        accounts, ads, analytics or third-party SDKs. The only thing anyone else
        can see is a case you choose to put on display, and it is shown
        anonymously. When you heart someone else&apos;s case, they are told only
        that someone wants it, never who.
      </p>

      <div className="space-y-2">
        <H2>Who I Am</H2>
        <p className="text-muted-foreground">
          Disc Collection is an independently developed app. If you have any
          questions about this policy, you can reach me at: <Email />
        </p>
      </div>

      <div className="space-y-2">
        <H2>What Data Disc Collection Uses</H2>
        <p className="text-muted-foreground">
          Disc Collection uses what you create in the app: photos of your cases,
          titles, platforms and formats, release years, ratings, hours played,
          runtimes, directors, whether you finished or watched something, written
          reviews, your wish list (the title and platform or format of cases
          you heart in the Gallery, and whether you have checked them off), and
          app settings such as sort order.
        </p>
        <p className="text-muted-foreground">
          This information is stored on your device using Apple&apos;s SwiftData
          framework. It is not collected on servers operated by the developer.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Camera &amp; Photos</H2>
        <p className="text-muted-foreground">
          Disc Collection uses the camera, with your permission, to photograph
          your cases, either with Apple&apos;s document scanner (the same one
          used in the Notes and Files apps) or the standard camera. You can also
          pick an existing photo using the system photo picker, which gives the
          app only the photo you choose, not your library.
        </p>
        <p className="text-muted-foreground">
          Photos are cropped and flattened to the shape of the case on your
          device. They are saved as part of your collection and are not uploaded
          anywhere unless you display that case in the Gallery.
        </p>
      </div>

      <div className="space-y-2">
        <H2>On-Device Processing</H2>
        <p className="text-muted-foreground">
          To fill in a case&apos;s details for you, Disc Collection uses
          Apple&apos;s Vision framework to read the text printed on your photos,
          such as the title on the spine or the year in the copyright line. This
          happens entirely on your device. Nothing is looked up in an online
          database, and the results are only suggestions you can edit.
        </p>
        <p className="text-muted-foreground">
          Before a photo is displayed in the Gallery, the app may check it with
          Apple&apos;s Sensitive Content Analysis framework, if you have turned on
          Sensitive Content Warning or Communication Safety on your device. This
          check also runs entirely on your device.
        </p>
      </div>

      <div className="space-y-2">
        <H2>iCloud &amp; Sync</H2>
        <p className="text-muted-foreground">
          Disc Collection uses Apple&apos;s CloudKit to sync your collection
          and your wish list between your own Apple devices through your private iCloud account,
          when iCloud is available. Your private iCloud data is accessible only
          to you, and the developer has no access to it.
        </p>
        <p className="text-muted-foreground">
          The collectors you block and the Gallery posts you report are kept in
          iCloud&apos;s key-value storage, so they apply on all your devices.
          These are also private to your iCloud account.
        </p>
      </div>

      <div className="space-y-2">
        <H2>The Gallery</H2>
        <p className="text-muted-foreground">
          The Gallery is optional. Nothing from your collection appears in it
          unless you choose Display in Gallery for a specific case.
        </p>
        <p className="text-muted-foreground">
          When you display a case, the following is published to the Gallery,
          which is stored in CloudKit&apos;s public database and can be seen by
          anyone using the app: the case&apos;s photos (at a reduced
          resolution), a rendered picture of the 3D case, its title, kind,
          platform or format, release year, rating, hours played or runtime,
          director, whether it is finished or watched, and its number in your
          collection.
        </p>
        <p className="text-muted-foreground">
          Your written review is never published. No name, email address or
          other contact information is published either. Like every CloudKit
          record, a post carries an opaque identifier for the iCloud account
          that created it. This identifier does not reveal who you are. The app
          uses it to show a number such as &ldquo;Collector #4821&rdquo; so the
          same poster appears the same way across their posts, and to let
          others block a poster.
        </p>
        <p className="text-muted-foreground">
          Displaying a case requires being signed in to iCloud. Browsing the
          Gallery does not. Hearting a case works without iCloud, but then it
          only adds the case to your wish list on that device, and its poster
          is not told.
        </p>
        <p className="text-muted-foreground">
          Because Gallery posts are public, the developer can see them, and may
          remove any post that is reported or that breaks the rules of the App
          Store.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Hearts &amp; Your Wish List</H2>
        <p className="text-muted-foreground">
          When you heart a case in the Gallery, its title and platform or format
          are added to your wish list, which is private to your iCloud account.
        </p>
        <p className="text-muted-foreground">
          If you are signed in to iCloud, the app also stores a small record in
          CloudKit&apos;s public database so the person who displayed the case
          can be told it was hearted. The record contains a reference to the
          post, the opaque identifier of the account that posted it, whether the
          heart is still on, and, like every CloudKit record, the opaque
          identifier of your iCloud account. It contains no name, email address
          or other contact information.
        </p>
        <p className="text-muted-foreground">
          The app never shows who hearted a case, or how many people did. The
          person who displayed it sees only that someone has it on their wish
          list. Taking a heart back turns its record off.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Notifications</H2>
        <p className="text-muted-foreground">
          The first time you display a case, the app asks permission to send
          notifications. With it, you are told when someone hearts one of your
          cases. The notification never says who, and never says how many.
        </p>
        <p className="text-muted-foreground">
          To do this, the app saves a CloudKit subscription for your iCloud
          account, and Apple delivers the notifications through the Apple Push
          Notification service. No server operated by the developer is
          involved. You can turn notifications off at any time in your
          device&apos;s Settings.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Reporting</H2>
        <p className="text-muted-foreground">
          When you report a post, the app stores a report containing a reference
          to that post and the reason you chose. Reports are readable only by
          the developer and are used solely to review content. If you are not
          signed in to iCloud, the app instead opens an email to the developer
          with the same information, which you can choose to send.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Artwork &amp; Trademarks</H2>
        <p className="text-muted-foreground">
          Disc Collection does not include or provide any cover art. Every case
          in the app shows photos taken by the person who owns that copy. The
          artwork in those photos belongs to its copyright holders.
        </p>
        <p className="text-muted-foreground">
          Disc Collection is not affiliated with or endorsed by any game
          publisher, film studio or platform maker. PlayStation, Xbox, Wii,
          GameCube, Blu-ray, DVD and other names are trademarks of their owners,
          used only to identify what a case is.
        </p>
        <p className="text-muted-foreground">
          If you believe a case displayed in the Gallery infringes your rights,
          contact me at <Email /> and I will review and remove it.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Third-Party Services</H2>
        <p className="text-muted-foreground">
          Disc Collection does not use third-party analytics, advertising,
          tracking SDKs, crash reporting services or data brokers.
        </p>
        <p className="text-muted-foreground">
          It uses Apple&apos;s first-party services and frameworks, including
          SwiftData, CloudKit, VisionKit, Vision, Sensitive Content Analysis and
          the Apple Push Notification service.
          These are governed by Apple&apos;s own privacy policies and security
          practices.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Sharing</H2>
        <p className="text-muted-foreground">
          I do not sell, rent, trade, or share your data with anyone. Outside of
          cases you choose to display in the Gallery, the developer has no
          access to your collection.
        </p>
        <p className="text-muted-foreground">
          Disc Collection does not use your data for advertising, tracking, or
          profiling.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Data Retention and Deletion</H2>
        <p className="text-muted-foreground">
          You can delete any case from within the app. You can take a case down
          from the Gallery at any time, which deletes its post.
        </p>
        <p className="text-muted-foreground">
          Settings includes Delete All Data, which deletes your collection and
          wish list from all your devices, takes down every case you have
          displayed in the Gallery, deletes the heart records you created,
          removes your notification subscription, and clears your blocked and
          hidden lists.
        </p>
        <p className="text-muted-foreground">
          Deleting the app removes its data from that device. Data synced
          through iCloud can also be managed in your device&apos;s iCloud
          settings. To take down Gallery posts, use Take Down or Delete All Data
          before deleting the app, or contact me and I will remove them.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Children&apos;s Privacy</H2>
        <p className="text-muted-foreground">
          Disc Collection does not knowingly collect personal information from
          anyone, including children under 13. Gallery posts contain no names or
          contact details.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Changes to This Policy</H2>
        <p className="text-muted-foreground">
          If I make changes to this privacy policy, I&apos;ll update the date at
          the top of this page. The latest version will always be available at
          this URL.
        </p>
      </div>

      <div className="space-y-2">
        <H2>Contact</H2>
        <p className="text-muted-foreground">
          Questions about this privacy policy, or a post you want taken down?
          Reach me at: <Email />
        </p>
      </div>
    </section>
  );
}
