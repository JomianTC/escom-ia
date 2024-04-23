const htmlString =  `<p>
"fechaInicio": "2024-02-01T06:00:00.000Z",
"fechaTermino": "2024-03-22T06:00:00.000Z",
<span style="font-size: 18px;">Quill Rich Text Editor</span>
</p>
<p>
<br>
</p>
<p>Quill is a free,
<a href="https://github.com/quilljs/quill/" target="_blank">open source</a>WYSIWYG editor built for the modern web. With its
<a href="http://quilljs.com/docs/modules/" target="_blank">extensible architecture</a>and a
<a href="http://quilljs.com/docs/api/" target="_blank">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</p>
<p>
<br>
</p>
<ul>
<li>Fast and lightweight</li>
<li>Semantic markup</li>
<li>Standardized HTML between browsers</li>
<li>Cross browser support including Chrome, Firefox, Safari, and IE 9+</li>
</ul>
<p>
<br>
</p>
<p>
<span style="font-size: 18px;">Downloads</span>
</p>
<p>
<br>
</p>
<ul>
<li>
<a href="https://quilljs.com" target="_blank">Quill.js</a>, the free, open source WYSIWYG editor</li>
<li>
<a href="https://zenoamaro.github.io/react-quill" target="_blank">React-quill</a>, a React component that wraps Quill.js</li>
<li>Hello</li>
<li>
<br>
</li>
</ul>`

const gettingAllLintTags = (htmlString) => { 
    const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[\s\S]*?>(.*?)<\/a>/gi;
    return htmlString.matchAll(regex);
}

const allLintTags = gettingAllLintTags(htmlString);
console.log(allLintTags);
// Iterar sobre las coincidencias y eliminar las etiquetas <a> del texto
for (const coincidencia of allLintTags) {
    const etiquetaCompleta = coincidencia[0]; // La etiqueta completa <a> con su contenido
    const enlace = coincidencia[1]; // El valor del atributo href
    const contenido = coincidencia[2]; // El contenido dentro de la etiqueta <a>
}
  
const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat amet assumenda aspernatur reprehenderit atque nisi laudantium, eveniet accusantium? Id odio quo a nihil sequi, necessitatibus obcaecati dicta cumque delectus atque. Beatae sit similique, dicta ad voluptatum nisi quas rem perferendis necessitatibus error ipsa, corrupti vitae! Doloremque incidunt animi, earum odit ex velit hic deleniti, voluptates beatae illo iure reiciendis odio. Provident eum sit facere deserunt mollitia amet aliquam, suscipit numquam, dicta adipisci ullam aperiam tenetur libero minima dignissimos obcaecati, facilis enim. Dignissimos animi nostrum modi minus dicta tenetur ab labore! Eveniet placeat dolorum iure architecto consequatur ea, omnis nihil, voluptatibus repellendus, voluptates voluptatum iusto officiis labore dolores commodi. Quas enim voluptates ipsum iure dolores ullam corporis molestias dicta ducimus at. Autem hic velit ad ipsa magnam. Facere, architecto odio veniam veritatis corrupti saepe modi, eos laudantium ullam animi sapiente, obcaecati qui quaerat provident? Nobis voluptatibus vero vitae quaerat sint labore! Consequatur ex quia perspiciatis veniam harum! Numquam enim adipisci est aliquam perferendis ab error porro labore quibusdam molestiae voluptatibus, architecto, ea quisquam aperiam iure? Ipsum aut optio perferendis eaque architecto? Autem ullam inventore est vitae sit sint sed perspiciatis accusamus ex, ut at saepe in corrupti expedita! Quidem sit qui quis facilis voluptatem assumenda consectetur dolorem laudantium? Quis, dolorum velit! Inventore ad ut itaque vero eos. Fuga quis laboriosam, quo veritatis maiores error explicabo. Nam a sit quae maxime similique ex, impedit, sequi voluptates harum ipsum inventore earum saepe! Perspiciatis. Minus sint quod ipsum corporis aut. Similique facilis totam necessitatibus laboriosam maxime vel laudantium dignissimos veniam recusandae, eos possimus dolorum aspernatur culpa amet explicabo quam eius est magni! Illo, dicta? Corporis rerum suscipit totam. Esse, architecto! Blanditiis exercitationem distinctio totam ipsa fugiat impedit nulla fuga harum? Quas odio id cupiditate unde fuga nisi voluptatibus nihil sapiente dolores, vel quos rem. Debitis vitae aperiam rem possimus vero repellendus, accusantium, illum, odit perferendis consequatur ipsum voluptate omnis minima id corrupti voluptatum. Accusantium quod nam architecto vel repellat atque, excepturi eveniet suscipit magnam. Deleniti veritatis consectetur reprehenderit! Nesciunt, reiciendis ex consequatur repudiandae numquam dolorem aspernatur corporis atque magni dignissimos consectetur fugiat beatae. Necessitatibus, cum! Voluptatum porro at, iusto libero vel a voluptates aliquam. Nostrum error minima nisi aut perferendis esse animi vitae doloremque, harum corporis repellendus distinctio. Expedita exercitationem ad, numquam commodi corporis dolorum id fugiat eos incidunt cumque tempora. Cum, quibusdam esse! Quibusdam consequuntur amet eligendi ducimus in possimus, quod commodi quo voluptatem quaerat? Dolores repudiandae quod nulla adipisci ea voluptate id aut, maiores inventore, repellendus rerum expedita officia esse accusantium tenetur! Iste neque excepturi quod fuga explicabo ad nesciunt ratione aliquam aliquid culpa natus corporis, facere repellendus, sit sequi quis fugiat eveniet consequatur est. Quam voluptatum magnam dolor perspiciatis asperiores harum! Omnis temporibus accusamus in placeat veniam quia dignissimos quo facere, facilis id nam illum iste nisi atque? A perferendis itaque accusamus esse, eveniet praesentium exercitationem distinctio ad suscipit vero modi? Perferendis accusantium incidunt corrupti saepe iure quae mollitia, eveniet, praesentium modi est velit possimus numquam sint impedit, totam pariatur officia blanditiis voluptates magnam similique dolor dolore! Velit unde perferendis consequatur. Tenetur inventore corporis expedita, illo, dolorem nobis quo laborum numquam cumque accusantium provident cum tempore maxime, excepturi assumenda in nihil? Numquam, quam. Aliquam quis nemo cumque vitae iste eligendi nihil. Repudiandae sit ipsum eveniet dolore dolorum esse explicabo quidem exercitationem facere assumenda aliquam eligendi vero doloribus dicta tempora laboriosam sapiente magni atque, unde iure laudantium. Fugiat non quo a deleniti?     Nisi animi optio, beatae aspernatur vero explicabo qui aliquid eius veritatis assumenda minima earum deserunt! Temporibus nisi aspernatur, delectus facilis itaque, exercitationem sapiente dolorum at in libero nobis, unde illo!" 


const shortedString = description.substring(0, 50);
console.log(shortedString);
