/**
 * Mostra de Trabalhos - SNCT 2026 - IFSC Câmpus Canoinhas
 * 
 * Estrutura de cada trabalho:
 * - id: Identificador numérico único
 * - titulo: Título completo do trabalho
 * - autores: Nomes dos autores separados por vírgula
 * - categoria: Categoria do trabalho (Relatos, Edificações, Viticultura, Agronomia1, Agronomia2)
 * - link: URL do vídeo (YouTube, Google Drive, Canva, etc.) ou vazio "" se ainda não disponível
 * 
 * Para adicionar ou alterar um link no futuro, basta preencher a propriedade "link" do trabalho correspondente!
 */

const TRABALHOS_DATA = [
  {
    "id": 1,
    "titulo": "Espanhol no ENEM: período 2015-2025",
    "autores": "Laura Campos de Borba",
    "categoria": "Relatos",
    "link": "https://youtu.be/QnfuZzFobbA"
  },
  {
    "id": 2,
    "titulo": "Do primeiro contato com o ifsc à divulgação da extensão: Experiência no projeto de aproveitamento da água do ar-condicionado",
    "autores": "Arthur Nicolas Da Silva Pinto Pereira, Aryane Spadotto, Cinthia Wambier Adimari, Daiane Caroline Wagner, Junior Serafim Correa, Manasses Carlos Taques",
    "categoria": "Relatos",
    "link": "https://youtu.be/7GMVFRWImlQ"
  },
  {
    "id": 3,
    "titulo": "Protagonismo discente e formação técnica: uma experiência com energia solar fotovoltaica",
    "autores": "Arthur Nicolas Da Silva Pinto Pereira, Guilherme Bernardes Nunes, Vitor Rigon Provenci, Lorena Becker Wippich, Manasses Carlos Taques, Cicero Venancio Nunes Junior, Aryane Spadotto",
    "categoria": "Relatos",
    "link": "https://www.youtube.com/watch?v=vEv32pcb7vM"
  },
  {
    "id": 4,
    "titulo": "Construindo minha trajetória no IFSC: extensão, participação e representação estudantil",
    "autores": "Arthur Nicolas Da Silva Pinto Pereira",
    "categoria": "Relatos",
    "link": "https://youtu.be/5AxKy9qMB_Q"
  },
  {
    "id": 5,
    "titulo": "Desenvolvimento de Pesos em Concreto Armado com RCD para Equipamentos de Academia ao Ar Livre",
    "autores": "Mauricio Feger Mello, Eduardo Massaneiro de Farias, Cassiano da Silva, Bruna Just Meller",
    "categoria": "Edificações",
    "link": "https://youtu.be/oSAh-liH4CM"
  },
  {
    "id": 6,
    "titulo": "Grupo de Estudos em Fruticultura e Vitivinicultura do IFSC Câmpus Canoinhas: ensino, pesquisa e extensão em prol do desenvolvimento regional",
    "autores": "Bruno Skraba Junior, Douglas André Würz, Júlia Aime Dybas, Ingrid Raquel Novacki, Gabrieli Vitória Trinoski, Caroline de Souza Wisniewski",
    "categoria": "Viticultura",
    "link": "https://youtu.be/QfP74kqZU8M?is=8Nk5giZJO3WsqMyW"
  },
  {
    "id": 7,
    "titulo": "Educação, Inclusão e Permanência: um relato de experiência sobre as políticas de apoio aos estudantes do PROEJA em Agroecologia do IFSC – Câmpus Canoinhas",
    "autores": "Mara Lúcia Schroeder Tavares, Douglas André Würz, Luis Carlos Vieira, Cícero Venâncio Júnior",
    "categoria": "Relatos",
    "link": "https://drive.google.com/drive/folders/1yPYP-6VOZMuAaMCcWbVv-Nf8xYJm1Ime?usp=drive_link"
  },
  {
    "id": 8,
    "titulo": "Acessibilidade e direito à cidade: diagnóstico das calçadas em um trecho da área central de Canoinhas - SC",
    "autores": "Gabrielly Aparecida Rosa, Jéssica Gabriel Garcias, Bruna Just Meller",
    "categoria": "Edificações",
    "link": "https://youtu.be/GlzOVeElQd8"
  },
  {
    "id": 9,
    "titulo": "Avaliação da sobrevivência mudas de videira ‘Sauvignon Blanc’ provenientes de diferentes seleções no estado de Santa Catarina",
    "autores": "Thaís Guis Passos, Bruno Skraba Junior, Ingrid Raquel Novacki, Douglas André Würz, Júlia Aime Dybas, Caroline de Souza Wisniewski, Gabrieli Vitória Trinoski, Alberto Fontanella Brighenti, Nelson Pires Feldberg",
    "categoria": "Viticultura",
    "link": "https://drive.google.com/file/d/1yRCIs3RzPX4FFWzOADoDXlmCKFcNyljt/view?usp=sharing"
  },
  {
    "id": 10,
    "titulo": "Flores-ser: cultivo de flores ornamentais e manejo agronômico como ferramenta de extensão inclusiva",
    "autores": "Danieli Aparecida Kaminski Zientara, Felipe Lucas dos Santos da Costa, Gabriele Hoppe Munhoz, Luara dos Santos, Vilmara Aparecida Santos da Costa, Eliziane Luiza Benedetti",
    "categoria": "Agronomia1",
    "link": "https://drive.google.com/file/d/1PWnr0m61lYq9lTZouXAd8cGCKwCAG9z1/view?usp=sharing"
  },
  {
    "id": 11,
    "titulo": "Isolamento e caracterização morfológica de Colletotrichum spp. associados a frutos de morango e uva no Planalto Norte Catarinense",
    "autores": "Gabrieli Vitoria Trisnoski, Thiago de Lima, Cícero Venancio Nunes, João Paulo Pereira Paes, Eduardo Henrique Goulin",
    "categoria": "Agronomia1",
    "link": "https://drive.google.com/file/d/1BCIh0qjGFd2xIZc2aDgA7QFXKgQxq0vZ/view?usp=sharing"
  },
  {
    "id": 12,
    "titulo": "Caracterização físico-química de castas minoritárias da Região dos Vinhos Verdes, Portugal",
    "autores": "Bárbara Thiem, Luis Felipe Lech, Isabel Maria Barreira Afonso Paula, Marta Vilas Boas, Maria Isabel Valín Sanjiao, Laís Fernanda Melo Pereira, João Paulo Pereira Paes",
    "categoria": "Viticultura",
    "link": "https://youtu.be/_TJGQ7C_eQk"
  },
  {
    "id": 13,
    "titulo": "Além da competição: relato de experiência da participação na Maratona Internacional de Punta del Este",
    "autores": "Mara Lúcia Schroeder Tavares, João Vitor Bueno Hupalo, Vitor Rigon Provenci",
    "categoria": "Relatos",
    "link": "https://youtu.be/NL1b2CFbJ6Q?si=GQxp00YjOVqJ_yar"
  },
  {
    "id": 14,
    "titulo": "Análise Centesimal De Iogurte De Morango Parcialmente Desnatado",
    "autores": "Monique Ruthes de Lima, Arthur de Oliveira Batista, Camile Adur, Isadora de Lima, Maria Clara do Prado Krzycyk, Luciano Heusser Malfatti",
    "categoria": "Agronomia1",
    "link": "https://youtu.be/Lzh_eO7hg00?feature=shared"
  },
  {
    "id": 15,
    "titulo": "Aplicação do geopolímero como alternativa ao cimento Portland em misturas de concreto",
    "autores": "Neusa Aparecida Munhak Beltrame, Arthur Nicolas Da Silva Pinto Pereira, Guilherme Bernardes Nunes, Rosana Márcia Colaço Bail, Anabelly Pereira, Maria Vitória Ribas, Enzo Robert Malinowski, Joao Vitor Bueno Hupalo, Andreza Frare, Daiane Caroline Wagner",
    "categoria": "Edificações",
    "link": "https://www.youtube.com/watch?v=gVnB-V3fF-Y"
  },
  {
    "id": 17,
    "titulo": "Extensão e Ressocialização: Formação Técnica na Fabricação de Pavers",
    "autores": "Daiane Caroline Wagner, Cinthia Wambier Adimari, Neusa Aparecida Munhak Beltrame, Camila Fernandes Komochena, Ana Julia Meneguzzo, Guilhermy de Oliveira, Manuely Teixeira, Matheus Ernani Piermann Dilda",
    "categoria": "Edificações",
    "link": "https://youtu.be/S6nOQdntN0s"
  },
  {
    "id": 18,
    "titulo": "Fenologia e requerimento térmico da videira 'Ribol' cultivada na região do Planalto Norte Catarinense",
    "autores": "Thaís Guis Passos, Bruno Skraba Junior, Caroline de Souza Wisniewski, Júlia Aime Dybas, Douglas André Wurz",
    "categoria": "Viticultura",
    "link": "https://drive.google.com/file/d/1s6xoRO2MG_b6Y3PJNLWgm5DwTWxJPBf7/view?usp=sharing"
  },
  {
    "id": 19,
    "titulo": "Descarte Consciente de Lixo Eletrônico",
    "autores": "Glaucio Luis Wachinski",
    "categoria": "Edificações",
    "link": "https://youtu.be/Nygx6WehVeo"
  },
  {
    "id": 20,
    "titulo": "Desenvolvimento de sistema de determinação de umidade do solo para automação de sistema de irrigação em erva-mate",
    "autores": "Luis Felipe Lech, Barbara Thiem, Henrique Martins Dantas, João Paulo Pereira Paes",
    "categoria": "Agronomia1",
    "link": "https://youtu.be/qT9fgSvOtK4"
  },
  {
    "id": 21,
    "titulo": "Entre cores, aromas e texturas: a implantação de um Jardim Sensorial no ambiente escolar",
    "autores": "Carla Cristina Wawrzyniak, Ana Júlia Alves Machado, Julia Aimê Dybas, Juliana Camargos de Freitas, Gesieli Priscila Buba",
    "categoria": "Edificações",
    "link": "https://youtu.be/MIfC3LbSjnw?is=bNg_fJyi3fPZ2Hhx"
  },
  {
    "id": 22,
    "titulo": "Germinação e crescimento inicial de plântulas de cultivares de arroz sob estresse salino",
    "autores": "Adrian Sigolin Moreira, Eduardo Antonovicz, Leticia Kachimareck, Tainá Aparecida Nogath, Eduardo Carlo Karvat, Gustavo André Catafesta, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia1",
    "link": "https://www.youtube.com/watch?v=UQc2mY1ecv0"
  },
  {
    "id": 23,
    "titulo": "Potencial antifúngico in vitro do extrato de chapéu-de-couro (Echinodorus sp.) sobre isolados de Colletotrichum sp.",
    "autores": "Gabrieli Vitória Trisnoski, Thiago de Lima, Katia de Fatima da Silveira, Josieli de Oliveira dos Santos Veiga, João Paulo Pereira Paes, Eduardo Henrique Goulin",
    "categoria": "Agronomia1",
    "link": "https://drive.google.com/file/d/103HVtFxQEsHdI9TdD22BJjgQEz-SZU6e/view?usp=sharing"
  },
  {
    "id": 24,
    "titulo": "Longevidade pós-colheita de hastes florais de Ornithogalum saundersiae em diferentes épocas de plantio",
    "autores": "Vilmara Aparecida Santos da Costa, Felipe Lucas dos Santos da Costa, José Carlos Romanchuk, Eliziane Luiza Benedetti",
    "categoria": "Agronomia1",
    "link": "https://youtu.be/dAhw1Rn44sw"
  },
  {
    "id": 25,
    "titulo": "Procedência e manejo de porta-enxertos no crescimento inicial de Araucaria angustifolia enxertada",
    "autores": "Flávio Henrique Mayer, Delmar Santin, José Carlos Romanchuk, Murilo Girolimetto Kohler, Eliziane Luiza Benedetti",
    "categoria": "Agronomia1",
    "link": "https://drive.google.com/file/d/1PKjJejq7k6hvZTmGqXCPBQRlrb_Y5p3e/view?usp=drive_link"
  },
  {
    "id": 26,
    "titulo": "Viabilidade e vigor de sementes salvas de soja da região do Planalto Norte Catarinense",
    "autores": "Eduardo Antonovicz, Tainá Aparecida Nogath, Adrian Sigolin Moreira, Carolina Glinski Fiorin, Gesieli Priscila Buba, Laís Fernanda Melo Pereira",
    "categoria": "Agronomia1",
    "link": "https://drive.google.com/file/d/11iTekDkZOIJDY1mEga6m_rk18md_Hlrg/view?usp=drivesdk"
  },
  {
    "id": 27,
    "titulo": "Do invisível ao concreto: impressão 3D de modelos moleculares",
    "autores": "Gabriel Fagundes Fernandes, Renan Padilha Wengrizinovski, Diovana de Mello Lalis, Jamille Valéria Piovesan, Natieli Piovesan",
    "categoria": "Edificações",
    "link": "https://drive.google.com/file/d/1UpGjSygkGmAjnhXOMi86NCfzP0arbxSp/view?usp=sharing"
  },
  {
    "id": 29,
    "titulo": "Produção de forragem em trigo BRS Tarumaxi em função de diferentes fertilizantes nitrogenados",
    "autores": "Everton José Nunes de Figueredo, Leticia Kachimareck, Gesieli Priscila Buba, Tiago Miqueloto",
    "categoria": "Agronomia1",
    "link": "https://youtu.be/1Ecx7KdFP2Y"
  },
  {
    "id": 30,
    "titulo": "Efeito do déficit hídrico na germinação e no desenvolvimento inicial de duas cultivares de soja",
    "autores": "Maria Eduarda de Lima, Mayara Oczkovski, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia1",
    "link": "https://canva.link/o3jz35jzg6yg82j"
  },
  {
    "id": 31,
    "titulo": "Desempenho fisiológico de sementes de feijão sob diferentes níveis de déficit hídrico",
    "autores": "Tainá Aparecida Nogath, Eduardo Carlo Karvat, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/Qr-5Ks76k9Y"
  },
  {
    "id": 32,
    "titulo": "Avaliação da eficiência econômica sobre dessecação de feijão preto IPR Urutau com os herbicidas glufosinato de amônio e diquat",
    "autores": "Eduardo Carlo Karvat, Tainá Aparecida Nogath, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/vcY19aal7Mg"
  },
  {
    "id": 33,
    "titulo": "Incidência de fungos em sementes salvas de cultivares de soja do Planalto Norte Catarinense",
    "autores": "Mayara Oczkovski, Maria Eduarda de Lima, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://drive.google.com/file/d/1TaVVibuK-XAMdZNosPNb9U3Umde8H88H/view?usp=drivesdk"
  },
  {
    "id": 34,
    "titulo": "Avaliação do período de secagem à sombra na superação de dormência de sementes de nêspera",
    "autores": "Bruno Skraba Junior, Ingrid Raquel Novacki, Douglas André Würz, Júlia Aime Dybas, Caroline de Souza Wisniewski, Gabrieli Vitória Trinoski",
    "categoria": "Viticultura",
    "link": "https://youtu.be/bOTNPv31bbI?is=MW80oiY2i3C4n7UG"
  },
  {
    "id": 35,
    "titulo": "Germinação, matéria seca e comprimento de plântulas de soja com diluições homeopáticas comparadas água deionizada homeopatizada, água tratada e tintura a 2% de cama de frango em água deionizada",
    "autores": "Tainá Aparecida Nogath, Eduardo Carlo Karvat, Gesieli Priscila Buba Roskamp, Cleiton Arendartchuk",
    "categoria": "Agronomia2",
    "link": "https://drive.google.com/file/d/1vVGTUt1qG4Qbm1ZnjhGnjvOPCR-FkNb9/view?usp=drivesdk"
  },
  {
    "id": 36,
    "titulo": "Eficácia de Crystal D3® no controle de Spodoptera frugiperda",
    "autores": "Júlia Aimê Dybas, Ana Júlia Alves Machado, Juliana Camargos de Freitas, João Paulo Pereira Paes",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/pE0fHWABrqg"
  },
  {
    "id": 37,
    "titulo": "Germinação e vigor de sementes de soja em função do teor de umidade inicial",
    "autores": "Leticia Kachimareck, Adrian Sigolin Moreira, Eduardo Antonovicz, Gustavo André Catafesta, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/lilCaKh69tc"
  },
  {
    "id": 38,
    "titulo": "Efeito da inclusão de couro na dieta sobre a massa corporal e a produção de frass por Tenebrio molitor",
    "autores": "Thiago de Lima, Gabrieli Vitória Trisnoski, Juliana Camargo Freitas, Andressa Antunes Bortoti, João Paulo Pereira Paes, Cícero Venâncio Nunes Junior",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/aDwAtppUdOk?is=Xps9dJLNUK0sGwL1"
  },
  {
    "id": 39,
    "titulo": "Qualidade fisiológica de sementes de soja em função do período e da condição de armazenamento",
    "autores": "Gustavo André Catafesta, Eduardo Carlo Karvat, Tainá Aparecida Nogath, Laís Fernanda Melo Pereira, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/3WOQ7k_tm5I"
  },
  {
    "id": 40,
    "titulo": "Nematoides Entomopatogênicos: Solução Biológica para a Broca-da-Erva-Mate (Hedypathes betulinus)",
    "autores": "Juliana Camargos de Freitas, Luis Felipe Lech, Henrique Martins Dantas, Barbara Thiem, Júlia Aimê Dybas, Thiago de Lima, Gabrieli Vitória Trisnoski, Luis Francisco Angeli Alves, João Paulo Pereira Paes",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/AZVEOTVNkkU?si=yyfJGTsQn9V1P-rn"
  },
  {
    "id": 41,
    "titulo": "Relato de vivências em intercâmbio no projeto integrado de apoio à vitivinicultura do Vale do Lima",
    "autores": "Bárbara Thiem, Maria Isabel Valín Sanjiao, Laís Melo Pereira Paes",
    "categoria": "Viticultura",
    "link": "https://youtu.be/NVFZtwu3nw8"
  },
  {
    "id": 42,
    "titulo": "Representatividade da Cesta Básica de Alimentos em relação ao salário mínimo em Canoinhas-SC: agosto de 2025 a julho de 2026",
    "autores": "Heloisa Ratochinski Nieckarz, Maria Eloisa Dolisznyy Pinto, Jefferson Treml, Luiz Paulo de Lima",
    "categoria": "Edificações",
    "link": "https://youtu.be/Sw6o2uUtCVw?is=uds7Fydccj629-7T"
  },
  {
    "id": 43,
    "titulo": "Fenologia e Requerimento térmico da videira 'Centennial Seedless' cultivada na região do Planalto Norte Catarinense - safra 2023/2024",
    "autores": "Thiago de Lima, Gabrieli Vitória Trisnoski, Caroline de Souza Wisniewski, Júlia Aimê Dybas, Douglas André Wurz",
    "categoria": "Viticultura",
    "link": "https://drive.google.com/file/d/1WrwgZE4aFVshkN8peQtMgHDWl5yxuQOV/view?usp=drivesdk"
  },
  {
    "id": 45,
    "titulo": "Compatibilidade microbiológica e fotoproteção por nanopartículas de titânio (TiO2) em conídios de Beauveria bassiana",
    "autores": "Juliana Camargos de Freitas, Gabrieli Vitória Trisnoski, Thiago de Lima, Júlia Aimê Dybas, Andressa Antunes Bortoti, João Paulo Pereira Paes, Cícero Venâncio Nunes Júnior",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/fAKPUl3zEH8?si=7as-wKuHgKn8RDkD"
  },
  {
    "id": 46,
    "titulo": "Raízes do Saber: Extensão Universitária e Práticas Agroecológicas na Educação Infantil",
    "autores": "Juliana Camargos de Freitas, Júlia Aimê Dybas, Carla Cristina Wawrzyniak, Ana Júlia Machado, Gesieli Priscila Buba",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/RR1X2NxeYKE?si=km7TJO76obitQOsb"
  },
  {
    "id": 47,
    "titulo": "Fenologia, requerimento térmico e maturação da videira ‘Vênus’ cultivada na região do Planalto Norte Catarinense na safra 2023/2024",
    "autores": "Gabrieli Vitória Trisnoski, Júlia Aimê Dybas, Ingrid Raquel Novacki, Bruno Skraba Junior, Caroline de Souza Wisniewski, Douglas André Wurz",
    "categoria": "Viticultura",
    "link": "https://drive.google.com/file/d/14ik25BceOrKl-bUszgATQdAvRfNH7BXC/view?usp=sharing"
  },
  {
    "id": 48,
    "titulo": "Avaliação da germinação e viabilidade de sementes de Cucumis melo provenientes de resíduo de cozinha processado termicamente",
    "autores": "Marciéli Pitorini Bovolini, Gesieli Priscila Buba, Rafael Goulart Machado, Ana Lúcia Hanisch",
    "categoria": "Agronomia2",
    "link": "https://www.youtube.com/watch?v=dv6wu9mMNWs"
  },
  {
    "id": 49,
    "titulo": "Fenologia e Requerimento Térmico da Videira 'Dedo de Dama' cultivada na Região do Planalto Norte Catarinense - safra 2023/2024",
    "autores": "Júlia Aimê Dybas, Ingrid Raquel Novak, Bruno Skraba Júnior, Gabrieli Vitoria Trisnoski, Caroline de Souza Wisniewski, Douglas André Wurz",
    "categoria": "Viticultura",
    "link": "https://youtu.be/xB7plG6AEFI"
  },
  {
    "id": 50,
    "titulo": "Fenologia e Requerimento Térmico da Videira 'BRS Vitória' cultivada na Região do Planalto Norte Catarinense - Safra 2023/2024",
    "autores": "Júlia Aimê Dybas, Ingrid Raquel Novak, Bruno Skraba Júnior, Gabrieli Vitoria Trisnoski, Caroline de Souza Wisniewski, Douglas André Wurz",
    "categoria": "Viticultura",
    "link": "https://youtu.be/QEsyiwsE7Fs"
  },
  {
    "id": 51,
    "titulo": "Mão na terra e mente no futuro: A força pedagógica do plantio de árvores nativas na escola",
    "autores": "Júlia Aimê Dybas, Juliana Camargos de Freitas, Carla Cristina Wawrziniak, Ana Júlia Alves Machado, Gesieli Priscila Buba, Lauro William Petrentchuk",
    "categoria": "Agronomia2",
    "link": "https://youtu.be/kSVfvrq5pLk"
  },
  {
    "id": 52,
    "titulo": "O protagonismo discente no IFSC Câmpus Canoinhas: relato de experiência do 3º Encontro Estadual dos Cursos Técnicos Integrados ao Ensino Médio do IFSC",
    "autores": "Alice Elisa Soares, Manuella Valentina Buttchewicz, Douglas André Würz, Mara Lúcia Schroeder Tavares, Juliete Alves dos Santos Linkowski",
    "categoria": "Relatos",
    "link": "https://drive.google.com/file/d/1TjZ_e4oPhaBmKze9BjrTlR7hXUT-l33z/view?usp=drivesdk"
  },
  {
    "id": 53,
    "titulo": "Efeito de diferentes protocolos de vinificação na composição química de vinhos elaborados com a videira ‘Bordô’",
    "autores": "Ingrid Raquel Novacki, Douglas André Würz, Júlia Aime Dybas, Caroline de Souza Wisniewski, Bruno Skraba Junior, Gabrieli Vitória Trinoski",
    "categoria": "Viticultura",
    "link": "https://youtu.be/xHAr5hMIMr8"
  },
  {
    "id": 54,
    "titulo": "Áreas de concentração dos Relatórios de Estágio Curricular Supervisionado do Curso em Agronomia do IFSC Câmpus Canoinhas: uma análise de 2022 a 2026",
    "autores": "Jefferson Schick, Douglas André Würz, Júlia Aime Dybas, Gustavo Kenji Matsuzawa, Carla Cristina Wawrzyniak",
    "categoria": "Edificações",
    "link": "https://youtu.be/xZ7FX2BbfdI"
  },
  {
    "id": 55,
    "titulo": "Áreas de concentração dos Trabalhos de Conclusão de Curso em Agronomia do IFSC Câmpus Canoinhas: uma análise de 2022 a 2026",
    "autores": "Douglas André Würz, Jefferson Schick, Júlia Aime Dybas, Gustavo Kenji Matsuzawa, Carla Cristina Wawrzyniak",
    "categoria": "Edificações",
    "link": "https://youtu.be/ncZ4-m9Vp5g"
  },
  {
    "id": 56,
    "titulo": "Hábitos e Preferências de Consumo de Frutas da Comunidade Interna do IFSC Câmpus Canoinhas",
    "autores": "Douglas André Würz, Júlia Aime Dybas, Caroline de Souza Wisniewski, Ingrid Raquel Novacki",
    "categoria": "Edificações",
    "link": "https://youtu.be/hXymI4Eiod4"
  },
  {
    "id": 57,
    "titulo": "Pomares domésticos: uma realidade entre a comunidade interna do IFSC Câmpus Canoinhas?",
    "autores": "Douglas André Würz, Júlia Aime Dybas, Ingrid Raquel Novacki",
    "categoria": "Viticultura",
    "link": "https://youtu.be/yMqZ9hzAmGs"
  }
];
