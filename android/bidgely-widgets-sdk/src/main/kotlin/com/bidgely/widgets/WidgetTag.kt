package com.bidgely.widgets

enum class WidgetTag(val tag: String) {
    USAGE_INSIGHTS("bidgely-usage-insights"),
    BILL_PROJECTION("bidgely-next-bill-projection"),
    RECOMMENDATION_TOP_TIPS("bidgely-recommendation-top-tips"),
    HOME_SURVEY("bidgely-home-survey"),
    HIGH_BILL_ANALYSER("bidgely-high-bill-analyser"),
    INSIGHTS_SIMILAR_HOMES("bidgely-similar-homes-insights"),
    RATE_PLAN_COMPARISON("bidgely-rate-plan-comparison"),
    INSIGHTS_MONTHLY_SUMMARY("bidgely-bill-itemisation"),
    RECOMMENDATION_TIPS_LIBRARY("bidgely-recommendation-tips"),
    CARE_ENGAGEMENT_VIEW("bidgely-engagement-view"),
    RECOMMENDATION_TOP_PROGRAMS("bidgely-recommendation-top-programs"),
    HOME_PROFILE_SURVEY("bidgely-home-profile-survey"),
    USER_PREFERENCES("bidgely-user-preferences"),
    GB_DOWNLOAD("bidgely-gb-download"),
    ;

    companion object {
        fun fromDomTag(tag: String): WidgetTag? = entries.find { it.tag == tag }

        fun fromAttrName(name: String): WidgetTag? {
            val normalized = name.trim().uppercase().replace('-', '_')
            return runCatching { valueOf(normalized) }.getOrNull()
        }

        fun parseList(attr: String?): List<WidgetTag> {
            if (attr.isNullOrBlank()) return emptyList()
            return attr.split(',', ';', ' ')
                .mapNotNull { part -> fromAttrName(part) }
        }
    }
}
