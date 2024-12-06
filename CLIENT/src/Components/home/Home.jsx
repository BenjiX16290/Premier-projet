import closeMenu from "../../hook/closeMenu";

function Home() {
  closeMenu();

  return (
    <>
      <main>
        <h1>Bienvenue sur E-change</h1>

        <section id="section-presentation">
          <article>
            <img
              src="src/assets/img/mecano.png"
              alt="Image d'un bonhome caricaturale représentant un mécanicien avec une clé plate à la main droite,
                  et une boite à outil rouge dans la main gauche"
            />
            <div>
              <p>
                E-change et astuces est un site internet qui se définit par
                lui-même : un lieu pour partager des astuces et échanger autour
                de questionnements ou de problèmes liés au bricolage, au
                dépannage de toutes sortes d'objets et à de petits travaux de
                construction, et bien d'autres sujets qui méritent qu'on prenne
                le temps de s'y intéresser. Le site sera un blog, rédigé par mes
                soins, avec des photos, des vidéos et des liens utiles; aucune
                personne autre que moi ne pourra interagir sur le blog dans un
                premier temps !
              </p>
              <p>
                Simplement des commentaires seront autorisés comme interactions.
                Le blog est basé sur des situations que j'ai vécues et
                réalisées, et que j'aimerais partager. Les utilisateurs pourront
                poser des questions et se répondre entre eux dans un second
                temps, en échangeant astuces et solutions liées à leurs propres
                problèmes aussi.
              </p>
              <p>
                Ce site s'adresse à ceux qui se demandent toujours "pourquoi ?"
                avant de se résigner et de penser : "Tant pis, je rachète" ou
                "Je ne me prends pas la tête, j'appelle quelqu'un". Tout en se
                disant : "C'est dommage, j'aimerais bien savoir pourquoi, mais
                comment faire ?" Le contenu du site repose principalement sur
                des expériences vécues, partagées par des personnes qui
                souhaitent faire bénéficier les autres de leur savoir. Parfois,
                un simple avis ou une photo suffit pour se lancer dans un projet
                qui semblait hors de portée. Quoi de plus satisfaisant que de
                résoudre un problème soi-même ?
              </p>
              <p>
                En résumé, ce site est un espace pour apprendre, obtenir des
                avis, ou même suivre des tutoriels, tout en échangeant avec des
                utilisateurs qui ont déjà été confrontés à de multiples
                problèmes liés au bricolage. Quoi de plus rassurant que d'avoir
                une communauté sur laquelle compter avant de se lancer dans
                l'inconnu ? C'est un site de partage, où chacun peut commenter
                les expériences des autres dans le respect mutuel et apporter
                ses propres idées.
              </p>
            </div>
            <img
              src="src/assets/img/mecano.png"
              alt="Image d'un bonhome caricaturale représentant un mécanicien avec une clé plate à la main droite,
                  et une boite à outil rouge dans la main gauche"
            />
          </article>
        </section>

        <section className="section-iframe">
          <article>
            <h2>
              Vidéo de petits conseils simples et efficaces, n'hésitez pas à
              aller voir leur chaîne, je vous la conseille.
            </h2>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/0R-j3ybaL9s"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </article>
        </section>

        <section id="section-blog">
          <article>
            <div>
              <h3>
                Certaines choses sont bien plus belles qu'elles n'y paraissent
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                itaque cum facere nesciunt quam veritatis soluta tempora quo
                quis temporibus! Quisquam sequi voluptatibus iste cupiditate,
                doloribus assumenda enim ipsa eaque. Voluptas, doloremque. Quis
                ipsa illo neque possimus reiciendis commodi aperiam omnis
                quibusdam rerum, perspiciatis optio eveniet eos nobis magni
                libero nihil? Reiciendis facilis iusto corporis qui possimus
                maxime quae sequi? Aut consequatur ab est consequuntur similique
                perspiciatis voluptate optio maiores, quas velit! Aspernatur,
                aut placeat aperiam fuga eveniet repudiandae, eligendi excepturi
                facilis magnam explicabo itaque iste maxime quae a harum? Qui
                omnis enim dolorem officiis cumque? Officiis qui beatae cum,
                quasi doloremque alias blanditiis nihil quos, reiciendis facilis
                eum adipisci. Inventore molestiae illum aspernatur quasi
                officiis dolorem cumque quibusdam dolor. Molestiae excepturi
                earum eligendi aliquam quidem quas necessitatibus reprehenderit
                vero labore sit a voluptate praesentium eum provident,
                consequatur cupiditate quod tempore delectus et ullam assumenda,
                quibusdam maiores. Unde, iste obcaecati.
              </p>
            </div>
            <img
              src="src/assets/img/piscine1.jpg"
              alt="Vue de mer avec des montagnes au fond. Au bord d'une piscine en hauteur"
            />
          </article>
          <article>
            <div>
              <h3>Des personnes ont essayé et ils ont fini par réussir</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                itaque cum facere nesciunt quam veritatis soluta tempora quo
                quis temporibus! Quisquam sequi voluptatibus iste cupiditate,
                doloribus assumenda enim ipsa eaque. Voluptas, doloremque. Quis
                ipsa illo neque possimus reiciendis commodi aperiam omnis
                quibusdam rerum, perspiciatis optio eveniet eos nobis magni
                libero nihil? Reiciendis facilis iusto corporis qui possimus
                maxime quae sequi? Aut consequatur ab est consequuntur similique
                perspiciatis voluptate optio maiores, quas velit! Aspernatur,
                aut placeat aperiam fuga eveniet repudiandae, eligendi excepturi
                facilis magnam explicabo itaque iste maxime quae a harum? Qui
                omnis enim dolorem officiis cumque? Officiis qui beatae cum,
                quasi doloremque alias blanditiis nihil quos, reiciendis facilis
                eum adipisci. Inventore molestiae illum aspernatur quasi
                officiis dolorem cumque quibusdam dolor. Molestiae excepturi
                earum eligendi aliquam quidem quas necessitatibus reprehenderit
                vero labore sit a voluptate praesentium eum provident,
                consequatur cupiditate quod tempore delectus et ullam assumenda,
                quibusdam maiores. Unde, iste obcaecati.
              </p>
            </div>
            <img
              src="src/assets/img/piscine4.jpg"
              alt="Vue d'une villa avec piscine devant"
            />
          </article>
          <article>
            <div>
              <h3>
                Sans avoir un terrain immense, il est possible de faire un petit
                coin cosy
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                itaque cum facere nesciunt quam veritatis soluta tempora quo
                quis temporibus! Quisquam sequi voluptatibus iste cupiditate,
                doloribus assumenda enim ipsa eaque. Voluptas, doloremque. Quis
                ipsa illo neque possimus reiciendis commodi aperiam omnis
                quibusdam rerum, perspiciatis optio eveniet eos nobis magni
                libero nihil? Reiciendis facilis iusto corporis qui possimus
                maxime quae sequi? Aut consequatur ab est consequuntur similique
                perspiciatis voluptate optio maiores, quas velit! Aspernatur,
                aut placeat aperiam fuga eveniet repudiandae, eligendi excepturi
                facilis magnam explicabo itaque iste maxime quae a harum? Qui
                omnis enim dolorem officiis cumque? Officiis qui beatae cum,
                quasi doloremque alias blanditiis nihil quos, reiciendis facilis
                eum adipisci. Inventore molestiae illum aspernatur quasi
                officiis dolorem cumque quibusdam dolor. Molestiae excepturi
                earum eligendi aliquam quidem quas necessitatibus reprehenderit
                vero labore sit a voluptate praesentium eum provident,
                consequatur cupiditate quod tempore delectus et ullam assumenda,
                quibusdam maiores. Unde, iste obcaecati.
              </p>
            </div>
            <img
              src="src/assets/img/piscine3.jpg"
              alt="Petit coin piscine avec terrasse en bois"
            />
          </article>
        </section>
      </main>
    </>
  );
}

export default Home;
