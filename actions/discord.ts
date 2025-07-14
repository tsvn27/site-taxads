"use server"

export async function sendDiscordWebhook(report: any) {
  const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

  if (!WEBHOOK_URL) {
    console.warn("DISCORD_WEBHOOK_URL não está configurado. O webhook não será enviado.")
    return
  }

  const fields = [
    {
      name: "`📋` Identificador",
      value:
        report.nome ||
        report.telegramUsername ||
        report.discordUsername ||
        report.otherPlatformIdentifier ||
        "Não informado",
      inline: true,
    },
    { name: "`🌐` Plataforma", value: report.plataforma || "Não informado", inline: true },
    { name: "`⚠️` Tipo de Golpe", value: report.tipo || "Não informado", inline: true },
    { name: "`📞` Telefone", value: report.telefone || "Não informado", inline: true },
    { name: "`📧` Email", value: report.email || "Não informado", inline: true },
    { name: "`🔗` ID Telegram", value: report.telegramUserId || "Não informado", inline: true },
    { name: "`🎮` ID Discord", value: report.discordUserId || "Não informado", inline: true },
    { name: "`👤` Denunciado por", value: report.reporterDiscordId || "Anônimo", inline: true },
    { name: "`📝` Descrição", value: report.descricao || "Nenhuma descrição fornecida", inline: false },
  ]

  if (report.images && report.images.length > 0) {
    fields.push({ name: "`📸` Evidências", value: report.images.join(", "), inline: false })
  }

  const embed = {
    title: "`🛡️` Denúncia Aprovada",
    description: "Nova denúncia foi verificada e adicionada ao sistema de segurança.",
    color: 0x2F3136,
    fields: fields,
    timestamp: new Date().toISOString(),
    footer: {
      text: "tsvn__ / kayo credits", 
      icon_url: "https://cdn.discordapp.com/embed/avatars/0.png"
    }
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embed] }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Erro ao enviar webhook do Discord: ${response.status} - ${errorText}`)
    } else {
      console.log("Webhook do Discord enviado com sucesso!")
    }
  } catch (error) {
    console.error("Erro ao enviar webhook do Discord:", error)
  }
}

export async function sendDiscordDM(userId: string, message: string) {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

  if (!BOT_TOKEN) {
    console.warn("DISCORD_BOT_TOKEN não está configurado. A mensagem direta não será enviada.")
    return
  }

  if (!userId) {
    console.warn("ID do usuário Discord não fornecido para enviar DM.")
    return
  }

  try {
    const createDMChannelResponse = await fetch(`https://discord.com/api/v10/users/@me/channels`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient_id: userId }),
    })

    if (!createDMChannelResponse.ok) {
      const errorText = await createDMChannelResponse.text()
      console.error(`Erro ao criar/obter canal de DM: ${createDMChannelResponse.status} - ${errorText}`)
      return
    }

    const dmChannel = await createDMChannelResponse.json()
    const channelId = dmChannel.id

    const sendMessageResponse = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    })

    if (!sendMessageResponse.ok) {
      const errorText = await sendMessageResponse.text()
      console.error(`Erro ao enviar mensagem para o canal de DM: ${sendMessageResponse.status} - ${errorText}`)
    } else {
      console.log(`Mensagem direta enviada com sucesso para o usuário ${userId}!`)
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem direta do Discord:", error)
  }
}