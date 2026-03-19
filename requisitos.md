# Requisitos — Aplicativo de Mobilidade Segura Feminina

**Origem:** `documentacao/visao.md`  
**Data:** 19/03/2026

## Lista de requisitos (tabela)

Convenções:
 - **Tipo:** RF (Funcional) / RNF (Não Funcional)
 - **Prioridade:** Must (MVP) / Should (importante) / Could (desejável)

| ID | Tipo | Nome | Descrição | Prioridade | Critério de aceite (resumo) |
|---|---|---|---|---|---|
| RF-01 | RF | Visualizar Mapa Interativo | Exibir mapa base com camadas de segurança e infraestrutura via Mapbox. | Must | Mapa renderiza com GPS ativo e ícones de referência visíveis. |
| RF-02 | RF | Calcular Rotas Seguras | Gerar trajetos priorizando iluminação e movimento (Smart Routing). | Must | O sistema sugere o caminho com melhor score de segurança. |
| RF-03 | RF | Índice de Segurança Dinâmico | Exibir score dinâmico por cores (verde/amarelo/vermelho) nos segmentos das vias. | Must | As cores das ruas mudam conforme infraestrutura e relatos. |
| RF-04 | RF | Filtros de "Estado da Rua" | Permitir filtrar o mapa por comércios abertos, patrulhamento ou iluminação. | Should | Filtros aplicados atualizam a visualização do mapa em tempo real. |
| RF-05 | RF | Relato Rápido | Registrar problemas (luz apagada, assédio, grupos suspeitos) com um toque. | Must | Relato salvo com geolocalização e data/hora automaticamente. |
| RF-06 | RF | Avaliação Pós-Trajeto | Solicitar feedback sobre a sensação de segurança ao finalizar uma rota. | Must | Resposta impacta o índice de segurança da via no banco de dados. |
| RF-07 | RF | Escolta Digital | Compartilhar localização em tempo real via link externo para contatos de confiança. | Must | Contatos acessam a posição exata da usuária via navegador. |
| RF-08 | RF | Alertas de Desvio | Notificar rede de apoio se a usuária sair da rota ou parar em zona de risco. | Should | Disparo automático de notificação para os contatos cadastrados. |
| RF-09 | RF | Localizar Pontos Violeta | Exibir e traçar rotas de emergência para estabelecimentos de refúgio. | Must | Início de navegação imediata ao clicar no ícone do ponto. |
| RF-10 | RF | Botão de Pânico | Ativar SMS com GPS, gravação de áudio e atalho para a polícia (190). | Must | Botão executa ações de emergência simultaneamente. |
| RF-11 | RF | Mapa Preditivo | Permitir simular a segurança de uma rota para horários futuros. | Must | Mapa altera índices conforme o horário selecionado. |
| RF-12 | RF | Quiz Conscientizador | Questionário educativo sobre tipos de violência no primeiro acesso. | Should | Usuária completa o quiz e padroniza termos de denúncia. |
| RF-13 | RF | Central de Informações | Listar telefones úteis, guias de primeiros socorros e direitos jurídicos. | Could | Acesso rápido a conteúdos educativos e contatos de emergência. |
| RNF-01 | RNF | Precisão Geográfica | Utilizar PostGIS para garantir precisão em consultas espaciais. | Must | Consultas de proximidade operam com alta precisão geográfica. |
| RNF-02 | RNF | Validade Temporal | Relatos perdem peso no índice após período sem revalidação. | Should | Sistema expira alertas antigos para manter o mapa atual. |
| RNF-03 | RNF | Consumo de Bateria | Otimizar o uso de GPS para preservar a bateria do dispositivo. | Should | Gestão eficiente da localização durante o trajeto. |

## Regras de negócio

- **RN-01 — Cálculo do Índice:** O índice de cada rua é uma média ponderada entre infraestrutura e histórico de relatos.
- **RN-02 — Validade de Relatos:** Relatos têm validade temporal; sem revalidação, perdem peso no índice dinâmico.
- **RN-03 — Pontos Violeta:** Representam locais físicos treinados para acolhimento imediato em situação de risco.
- **RN-04 — Escolta Virtual:** Contatos de confiança devem visualizar a rota sem precisar instalar o app.
- **RN-05 — Lógica Temporal:** O sistema reconhece que a segurança de uma via muda conforme o horário do dia.