// Navbar and Footer are provided by the root layout

export default function AboutPage() {
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 py-20">

        <div className="text-center">

          <div
            className="
            h-40
            w-40
            mx-auto
            rounded-full
            bg-gradient-to-br
            from-purple-600
            to-blue-600
            "
          />

          <h1
            className="
            heading-font
            text-5xl
            md:text-7xl
            mt-8
            "
          >
            Moeen Mukhtar
          </h1>

          <p
            className="
            text-slate-400
            mt-4
            "
          >
            Writer • Poet • Storyteller
          </p>

        </div>

        <section className="mt-20">

          <h2
            className="
            text-3xl
            heading-font
            mb-6
            "
          >
            My Journey
          </h2>

          <div
            className="
            glass
            rounded-3xl
            p-8
            "
          >

            <p className="leading-8">

              Poetry for me is not merely
              writing words. It is the art
              of preserving emotions,
              memories, silence and the
              hidden conversations of the
              soul.

            </p>

            <p className="leading-8 mt-6">

              Through every verse I try to
              capture moments that often
              remain unspoken. This website
              is a collection of those
              thoughts, reflections and
              emotions.

            </p>

          </div>

        </section>

        <section className="mt-20">

          <h2
            className="
            text-3xl
            heading-font
            mb-8
            "
          >
            Contact
          </h2>

          <div
            className="
            glass
            p-8
            rounded-3xl
            "
          >

            <p>
              Email:
              moeenmukhtar14@gmail.com
            </p>

            <p className="mt-4">
              Phone:
              8494011912
            </p>

          </div>

        </section>

      </main>

    </>
  );
}
